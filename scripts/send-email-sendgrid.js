// Simple Node.js script using SendGrid
const sgMail = require('@sendgrid/mail');

// Set API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY || 'your_sendgrid_api_key_here');

// Function to send email using SendGrid
async function sendEmailSendGrid(to, subject, message, fromName = 'Portfolio Contact') {
  try {
    const msg = {
      to: to,
      from: {
        email: 'jobs.renjith@gmail.com',
        name: fromName
      },
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            ${subject}
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; font-size: 16px; line-height: 1.6;">
              ${message.replace(/\n/g, '<br>')}
            </p>
          </div>
          
          <div style="background-color: #e9ecef; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p style="margin: 0; color: #6c757d; font-size: 14px;">
              <strong>Sent:</strong> ${new Date().toLocaleString()}<br>
              <strong>From:</strong> ${fromName}
            </p>
          </div>
        </div>
      `,
      text: message
    };
    
    const response = await sgMail.send(msg);
    console.log('✅ Email sent successfully!');
    console.log('Status Code:', response[0].statusCode);
    console.log('Message ID:', response[0].headers['x-message-id']);
    
    return { success: true, messageId: response[0].headers['x-message-id'] };
    
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    if (error.response) {
      console.error('Response body:', error.response.body);
    }
    return { success: false, error: error.message };
  }
}

// Function to send contact form email
async function sendContactFormSendGrid(name, email, message) {
  const subject = `New Contact Form Submission from ${name}`;
  const emailMessage = `
    New contact form submission received:
    
    Name: ${name}
    Email: ${email}
    Message: ${message}
    
    You can reply directly to this person at: ${email}
  `;
  
  return await sendEmailSendGrid('jobs.renjith@gmail.com', subject, emailMessage, 'Portfolio Contact Form');
}

// Example usage
async function main() {
  console.log('🚀 Starting SendGrid email script...');
  
  // Check if API key is set
  if (!process.env.SENDGRID_API_KEY) {
    console.log('⚠️  SENDGRID_API_KEY not found. Please set it as environment variable.');
    console.log('   Example: SENDGRID_API_KEY=SG.your_key_here node send-email-sendgrid.js');
    return;
  }
  
  // Example 1: Send a simple email
  console.log('\n📧 Sending simple email...');
  await sendEmailSendGrid(
    'jobs.renjith@gmail.com',
    'Test Email from Node.js (SendGrid)',
    'This is a test email sent from a Node.js script using SendGrid!'
  );
  
  // Example 2: Send contact form email
  console.log('\n📧 Sending contact form email...');
  await sendContactFormSendGrid(
    'Bob Johnson',
    'bob@example.com',
    'Hi! I saw your portfolio and would like to discuss a potential collaboration.'
  );
  
  console.log('\n✅ SendGrid email script completed!');
}

// Run the script if called directly
if (require.main === module) {
  main().catch(console.error);
}

// Export functions for use in other files
module.exports = {
  sendEmailSendGrid,
  sendContactFormSendGrid
};
