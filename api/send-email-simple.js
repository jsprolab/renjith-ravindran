// Simple email sending API endpoint with database storage
import connectDB from '../lib/mongodb.js';
import Contact from '../models/Contact.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
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
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, email, message'
      });
    }

    // Connect to database
    await connectDB();

    // Save contact to database
    const contact = new Contact({
      name,
      email,
      message,
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress || '',
      userAgent: req.headers['user-agent'] || ''
    });

    await contact.save();
    console.log('Contact saved to database:', contact._id);

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      return res.status(200).json({
        success: true,
        message: 'Contact saved successfully. Email service not configured.',
        data: {
          id: contact._id,
          name,
          email,
          message,
          createdAt: contact.createdAt
        }
      });
    }

    // Send email using fetch to Resend API
    const emailData = {
      from: 'Portfolio Contact Form <onboarding@resend.dev>',
      to: ['jobs.renjith@gmail.com'],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-left: 4px solid #007bff; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="background-color: #e9ecef; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p style="margin: 0; color: #6c757d; font-size: 14px;">
              <strong>Submitted:</strong> ${new Date().toLocaleString()}<br>
              <strong>From:</strong> Portfolio Contact Form
            </p>
          </div>
          
          <div style="margin-top: 20px; text-align: center;">
            <a href="mailto:${email}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Reply to ${name}
            </a>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Message: ${message}
        
        Submitted: ${new Date().toLocaleString()}
        From: Portfolio Contact Form
      `
    };

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Resend API error:', result);
      return res.status(500).json({
        success: false,
        message: 'Failed to send email',
        error: result.message || 'Unknown error'
      });
    }

    console.log('Email sent successfully:', result.id);
    
    res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      messageId: result.id,
      data: {
        id: contact._id,
        name,
        email,
        message,
        createdAt: contact.createdAt
      }
    });

  } catch (error) {
    console.error('Error sending email:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error.message
    });
  }
}
