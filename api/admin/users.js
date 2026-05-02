// Admin user management API
import connectDB from '../../lib/mongodb.js';
import Admin from '../../models/Admin.js';
import { verifyToken } from '../../lib/auth.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }

  try {
    await connectDB();

    if (req.method === 'GET') {
      const admins = await Admin.find({}, '-password').sort({ createdAt: -1 });
      return res.status(200).json({ success: true, data: admins });

    } else if (req.method === 'POST') {
      const { username, email, password, role } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'Username, email and password are required' });
      }

      const existing = await Admin.findOne({ $or: [{ username }, { email }] });
      if (existing) {
        return res.status(409).json({ success: false, message: 'Username or email already exists' });
      }

      const admin = new Admin({ username, email, password, role: role || 'admin' });
      await admin.save();

      return res.status(201).json({ success: true, data: admin.toJSON() });

    } else if (req.method === 'PUT') {
      const { id, username, email, password, role } = req.body;

      if (!id) {
        return res.status(400).json({ success: false, message: 'User ID is required' });
      }

      const admin = await Admin.findById(id);
      if (!admin) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      if (username && username !== admin.username) {
        const exists = await Admin.findOne({ username, _id: { $ne: id } });
        if (exists) return res.status(409).json({ success: false, message: 'Username already taken' });
        admin.username = username;
      }

      if (email && email !== admin.email) {
        const exists = await Admin.findOne({ email, _id: { $ne: id } });
        if (exists) return res.status(409).json({ success: false, message: 'Email already taken' });
        admin.email = email;
      }

      if (role) admin.role = role;
      if (password) admin.password = password;

      await admin.save();
      return res.status(200).json({ success: true, data: admin.toJSON() });

    } else if (req.method === 'DELETE') {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ success: false, message: 'User ID is required' });
      }

      if (decoded.id === id) {
        return res.status(400).json({ success: false, message: 'You cannot delete your own account' });
      }

      const admin = await Admin.findByIdAndDelete(id);
      if (!admin) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      return res.status(200).json({ success: true, message: 'User deleted successfully' });

    } else {
      return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

  } catch (error) {
    console.error('Admin users error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
