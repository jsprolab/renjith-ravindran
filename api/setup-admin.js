// Setup admin user API
import connectDB from '../lib/mongodb.js';
import Admin from '../models/Admin.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    await connectDB();

    const adminData = {
      username: 'admin',
      email: 'jobs.renjith@gmail.com',
      password: 'admin123',
      role: 'super_admin'
    };

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      $or: [
        { username: adminData.username },
        { email: adminData.email }
      ]
    });

    if (existingAdmin) {
      return res.status(200).json({
        success: true,
        message: 'Admin user already exists',
        admin: {
          username: existingAdmin.username,
          email: existingAdmin.email
        }
      });
    }

    // Create new admin
    const admin = new Admin(adminData);
    await admin.save();

    res.status(200).json({
      success: true,
      message: 'Admin user created successfully',
      admin: {
        username: admin.username,
        email: admin.email
      }
    });

  } catch (error) {
    console.error('Setup admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}
