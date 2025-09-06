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

        // In a real app, you'd save to a database here
        // For now, we'll just log and return success
        console.log('New contact submission:', {
          name,
          email,
          message,
          timestamp: new Date().toISOString(),
          ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
        });

        // Simulate saving to database
        const newContact = {
          id: Date.now(), // Simple ID generation
          name,
          email,
          message,
          created_at: new Date().toISOString()
        };

        res.status(201).json({
          success: true,
          message: 'Contact submission received successfully',
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
