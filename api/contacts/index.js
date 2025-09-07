// Vercel API Route for Contact Form
// Handles GET and POST requests for contact submissions

import { connectDB } from '../../lib/mongodb.js';
import Contact from '../../models/Contact.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { method } = req;

  switch (method) {
    case 'GET':
      // Get all contact submissions (for admin purposes)
      try {
        await connectDB();
        
        const { page = 1, limit = 10, status, search } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        // Build filter object
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
          .skip(skip)
          .limit(parseInt(limit));
        
        const total = await Contact.countDocuments(filter);
        
        res.status(200).json({
          success: true,
          data: {
            contacts,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / parseInt(limit))
          }
        });
      } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({
          success: false,
          message: 'Error fetching contacts',
          error: error.message
        });
      }
      break;

    case 'POST':
      // Create new contact submission
      try {
        const { name, email, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
          return res.status(400).json({
            success: false,
            message: 'Missing required fields: name, email, message'
          });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({
            success: false,
            message: 'Invalid email format'
          });
        }

        // Send email notification using Resend
        try {
          const { Resend } = await import('resend');
          const resend = new Resend(process.env.RESEND_API_KEY);

          if (process.env.RESEND_API_KEY) {
            const { data, error } = await resend.emails.send({
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
            });

            if (error) {
              console.error('Resend email error:', error);
            } else {
              console.log('Email sent successfully via Resend:', data.id);
            }
          } else {
            console.log('RESEND_API_KEY not configured, skipping email notification');
          }
        } catch (emailError) {
          console.error('Error sending email:', emailError);
        }

        // Connect to database and save contact
        await connectDB();
        
        // Get client IP
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
        
        // Create contact record in database
        const newContact = new Contact({
          name,
          email,
          message,
          status: 'new',
          ip,
          createdAt: new Date()
        });
        
        await newContact.save();
        
        console.log('Contact saved to database:', newContact._id);

        res.status(201).json({
          success: true,
          message: 'Contact submission received successfully and email sent',
          data: {
            id: newContact._id,
            name: newContact.name,
            email: newContact.email,
            message: newContact.message,
            status: newContact.status,
            createdAt: newContact.createdAt
          }
        });

      } catch (error) {
        console.error('Error processing contact submission:', error);
        res.status(500).json({
          success: false,
          message: 'Error processing contact submission',
          error: error.message
        });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({
        success: false,
        message: `Method ${method} Not Allowed`
      });
  }
}
