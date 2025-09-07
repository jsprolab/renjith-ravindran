// Health check API
import connectDB from '../lib/mongodb.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    // Test MongoDB connection
    await connectDB();
    
    res.status(200).json({
      success: true,
      message: 'API is healthy',
      database: 'connected',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Health check error:', error);
    
    res.status(500).json({
      success: false,
      message: 'API health check failed',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
