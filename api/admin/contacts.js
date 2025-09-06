// Admin contacts management API
import connectDB from '../../lib/mongodb';
import Contact from '../../models/Contact';
import { verifyToken } from '../../lib/auth';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Verify authentication
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided'
    });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }

  try {
    await connectDB();

    if (req.method === 'GET') {
      // Get all contacts with pagination
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const status = req.query.status;
      const search = req.query.search;

      const filter = {};
      if (status) filter.status = status;
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { message: { $regex: search, $options: 'i' } }
        ];
      }

      const contacts = await Contact.find(filter)
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      const total = await Contact.countDocuments(filter);

      res.status(200).json({
        success: true,
        data: {
          contacts,
          pagination: {
            current: page,
            pages: Math.ceil(total / limit),
            total
          }
        }
      });

    } else if (req.method === 'PUT') {
      // Update contact status
      const { id, status } = req.body;

      if (!id || !status) {
        return res.status(400).json({
          success: false,
          message: 'Contact ID and status are required'
        });
      }

      const contact = await Contact.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      if (!contact) {
        return res.status(404).json({
          success: false,
          message: 'Contact not found'
        });
      }

      res.status(200).json({
        success: true,
        data: contact
      });

    } else if (req.method === 'DELETE') {
      // Delete contact
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Contact ID is required'
        });
      }

      const contact = await Contact.findByIdAndDelete(id);

      if (!contact) {
        return res.status(404).json({
          success: false,
          message: 'Contact not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Contact deleted successfully'
      });

    } else {
      res.status(405).json({
        success: false,
        message: 'Method not allowed'
      });
    }

  } catch (error) {
    console.error('Admin contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
