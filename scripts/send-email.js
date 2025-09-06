// Simple Node.js script to send emails
const nodemailer = require('nodemailer');

// Email configuration
const emailConfig = {
  // Option 1: Gmail SMTP
  gmail: {
    service: 'gmail',
    auth: {
      user: 'jobs.renjith@gmail.com',
      pass: 'your_app_password_here' // Gmail App Password
    }
  },
  
  // Option 2: Outlook/Hotmail SMTP
  outlook: {
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
      user: 'jobs.renjith@outlook.com',
      pass: 'your_password_here'
    }
  },
  
  // Option 3: Custom SMTP (like GoDaddy, etc.)
  custom: {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'jobs.renjith@gmail.com',
      pass: 'your_app_password_here'
    }
  }
};

// Function to send email
async function sendEmail(to, subject, message, fromName = 'Portfolio Contact') {
  try {
    // Create transporter (choose one option above)
    const transporter = nodemailer.createTransporter(emailConfig.gmail);
    
    // Email options
    const mailOptions = {
      from: `"${fromName}" <jobs.renjith@gmail.com>`,
      to: to,
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
    
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
    
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    return { success: false, error: error.message };
  }
}

// Function to send contact form email
async function sendContactForm(name, email, message) {
  const subject = `New Contact Form Submission from ${name}`;
  const emailMessage = `
    New contact form submission received:
    
    Name: ${name}
    Email: ${email}
    Message: ${message}
    
    You can reply directly to this person at: ${email}
  `;
  
  return await sendEmail('jobs.renjith@gmail.com', subject, emailMessage, 'Portfolio Contact Form');
}

// Example usage
async function main() {
  console.log('🚀 Starting email script...');
  
  // Example 1: Send a simple email
  console.log('\n📧 Sending simple email...');
  await sendEmail(
    'jobs.renjith@gmail.com',
    'Test Email from Node.js',
    'This is a test email sent from a Node.js script!'
  );
  
  // Example 2: Send contact form email
  console.log('\n📧 Sending contact form email...');
  await sendContactForm(
    'John Doe',
    'john@example.com',
    'Hello! I would like to discuss a project opportunity.'
  );
  
  console.log('\n✅ Email script completed!');
}

// Run the script if called directly
if (require.main === module) {
  main().catch(console.error);
}

// Export functions for use in other files
module.exports = {
  sendEmail,
  sendContactForm
};
