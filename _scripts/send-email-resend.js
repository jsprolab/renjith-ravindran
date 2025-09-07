// Simple Node.js script using Resend (no SMTP setup needed)
const { Resend } = require('resend');

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY || 'your_resend_api_key_here');

// Function to send email using Resend
async function sendEmailResend(to, subject, message, fromName = 'Portfolio Contact') {
  try {
    const { data, error } = await resend.emails.send({
      from: `${fromName} <onboarding@resend.dev>`,
      to: [to],
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
    });
    
    if (error) {
      console.error('❌ Resend error:', error);
      return { success: false, error: error.message };
    }
    
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', data.id);
    
    return { success: true, messageId: data.id };
    
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    return { success: false, error: error.message };
  }
}

// Function to send contact form email
async function sendContactFormResend(name, email, message) {
  const subject = `New Contact Form Submission from ${name}`;
  const emailMessage = `
    New contact form submission received:
    
    Name: ${name}
    Email: ${email}
    Message: ${message}
    
    You can reply directly to this person at: ${email}
  `;
  
  return await sendEmailResend('jobs.renjith@gmail.com', subject, emailMessage, 'Portfolio Contact Form');
}

// Example usage
async function main() {
  console.log('🚀 Starting Resend email script...');
  
  // Check if API key is set
  if (!process.env.RESEND_API_KEY) {
    console.log('⚠️  RESEND_API_KEY not found. Please set it as environment variable.');
    console.log('   Example: RESEND_API_KEY=re_your_key_here node send-email-resend.js');
    return;
  }
  
  // Example 1: Send a simple email
  console.log('\n📧 Sending simple email...');
  await sendEmailResend(
    'jobs.renjith@gmail.com',
    'Test Email from Node.js (Resend)',
    'This is a test email sent from a Node.js script using Resend!'
  );
  
  // Example 2: Send contact form email
  console.log('\n📧 Sending contact form email...');
  await sendContactFormResend(
    'Jane Smith',
    'jane@example.com',
    'Hello! I am interested in your services. Can we schedule a call?'
  );
  
  console.log('\n✅ Resend email script completed!');
}

// Run the script if called directly
if (require.main === module) {
  main().catch(console.error);
}

// Export functions for use in other files
module.exports = {
  sendEmailResend,
  sendContactFormResend
};
