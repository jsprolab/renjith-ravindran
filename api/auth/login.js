// Admin login API
import connectDB from '../../lib/mongodb';
import Admin from '../../models/Admin';
import { createAuthResponse } from '../../lib/auth';

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

    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    // Find admin by username or email
    let admin = await Admin.findOne({
      $or: [
        { username: username.toLowerCase() },
        { email: username.toLowerCase() }
      ],
      isActive: true
    });

    // If no admin exists and trying to login with default credentials, create admin user
    if (!admin && username.toLowerCase() === 'admin' && password === 'admin123') {
      // Check if any admin exists at all
      const adminCount = await Admin.countDocuments();
      if (adminCount === 0) {
        // Create default admin user
        admin = new Admin({
          username: 'admin',
          email: 'jobs.renjith@gmail.com',
          password: 'admin123',
          role: 'super_admin',
          isActive: true
        });
        await admin.save();
        console.log('✅ Default admin user created');
      }
    }

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Create auth response
    const authResponse = createAuthResponse(admin);

    res.status(200).json(authResponse);

  } catch (error) {
    console.error('Login error:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Internal server error';
    if (error.message.includes('MONGODB_URI')) {
      errorMessage = 'Database configuration error';
    } else if (error.message.includes('connect')) {
      errorMessage = 'Database connection failed';
    } else if (error.message.includes('password')) {
      errorMessage = 'Password validation error';
    }
    
    res.status(500).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
