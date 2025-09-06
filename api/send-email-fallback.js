// Fallback email API that logs contact form submissions
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

    // Log the contact form submission
    console.log('📧 NEW CONTACT FORM SUBMISSION:');
    console.log('================================');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);
    console.log('Timestamp:', new Date().toISOString());
    console.log('================================');

    // Create a simple email notification (you can check Vercel logs)
    const emailContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Message: ${message}

Submitted: ${new Date().toLocaleString()}
From: Portfolio Contact Form

You can reply directly to: ${email}
    `;

    console.log('📧 EMAIL CONTENT:');
    console.log(emailContent);

    // For now, just return success
    // In production, you would integrate with an email service
    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully. Check Vercel logs for details.',
      data: {
        name,
        email,
        message,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to process contact form',
      error: error.message
    });
  }
}
