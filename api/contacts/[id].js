// Vercel API Route for Individual Contact Operations
// Handles GET, PUT, DELETE requests for specific contact by ID

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { method } = req;
  const { id } = req.query;

  // Validate ID
  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({
      success: false,
      message: 'Invalid contact ID'
    });
  }

  switch (method) {
    case 'GET':
      // Get specific contact by ID
      try {
        // In a real app, you'd fetch from database
        res.status(200).json({
          success: true,
          message: `Contact ${id} retrieved successfully`,
          data: {
            id: parseInt(id),
            name: 'Sample Contact',
            email: 'sample@example.com',
            message: 'This is a sample contact',
            created_at: new Date().toISOString()
          }
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: 'Error fetching contact',
          error: error.message
        });
      }
      break;

    case 'PUT':
      // Update specific contact
      try {
        const { name, email, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
          return res.status(400).json({
            success: false,
            message: 'Missing required fields: name, email, message'
          });
        }

        // In a real app, you'd update in database
        const updatedContact = {
          id: parseInt(id),
          name,
          email,
          message,
          updated_at: new Date().toISOString()
        };

        res.status(200).json({
          success: true,
          message: `Contact ${id} updated successfully`,
          data: updatedContact
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: 'Error updating contact',
          error: error.message
        });
      }
      break;

    case 'DELETE':
      // Delete specific contact
      try {
        // In a real app, you'd delete from database
        res.status(200).json({
          success: true,
          message: `Contact ${id} deleted successfully`
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: 'Error deleting contact',
          error: error.message
        });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).json({
        success: false,
        message: `Method ${method} Not Allowed`
      });
  }
}
