// Vercel API Route for Contact Form
// Handles GET and POST requests for contact submissions

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
        // In a real app, you'd fetch from a database
        // For now, return a sample response
        res.status(200).json({
          success: true,
          message: 'Contact API is working',
          data: {
            total: 0,
            submissions: []
          }
        });
      } catch (error) {
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

        // Send email notification
        try {
          const emailResponse = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/email/send`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message })
          });

          if (!emailResponse.ok) {
            console.error('Failed to send email notification');
          }
        } catch (emailError) {
          console.error('Error sending email:', emailError);
        }

        // Log the submission
        console.log('New contact submission:', {
          name,
          email,
          message,
          timestamp: new Date().toISOString(),
          ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
        });

        // Create contact record
        const newContact = {
          id: Date.now(), // Simple ID generation
          name,
          email,
          message,
          created_at: new Date().toISOString()
        };

        res.status(201).json({
          success: true,
          message: 'Contact submission received successfully and email sent',
          data: newContact
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
