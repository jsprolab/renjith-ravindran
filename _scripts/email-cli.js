#!/usr/bin/env node

// Simple CLI tool for sending emails
const { sendEmailResend } = require('./send-email-resend');
const { sendEmail } = require('./send-email');
const { sendEmailSendGrid } = require('./send-email-sendgrid');

// Parse command line arguments
const args = process.argv.slice(2);

function showHelp() {
  console.log(`
📧 Email CLI Tool

Usage:
  node scripts/email-cli.js <service> <to> <subject> <message>

Services:
  resend     - Use Resend (requires RESEND_API_KEY)
  nodemailer - Use Nodemailer (requires Gmail App Password)
  sendgrid   - Use SendGrid (requires SENDGRID_API_KEY)

Examples:
  node scripts/email-cli.js resend jobs.renjith@gmail.com "Test" "Hello World"
  node scripts/email-cli.js nodemailer jobs.renjith@gmail.com "Test" "Hello World"
  node scripts/email-cli.js sendgrid jobs.renjith@gmail.com "Test" "Hello World"

Environment Variables:
  RESEND_API_KEY=re_your_key_here
  SENDGRID_API_KEY=SG.your_key_here
  GMAIL_APP_PASSWORD=your_app_password_here
`);
}

async function main() {
  if (args.length < 4 || args[0] === 'help' || args[0] === '--help' || args[0] === '-h') {
    showHelp();
    return;
  }

  const [service, to, subject, ...messageParts] = args;
  const message = messageParts.join(' ');

  console.log(`🚀 Sending email using ${service}...`);
  console.log(`📧 To: ${to}`);
  console.log(`📝 Subject: ${subject}`);
  console.log(`💬 Message: ${message}`);
  console.log('');

  let result;

  switch (service.toLowerCase()) {
    case 'resend':
      if (!process.env.RESEND_API_KEY) {
        console.error('❌ RESEND_API_KEY environment variable not set');
        process.exit(1);
      }
      result = await sendEmailResend(to, subject, message);
      break;

    case 'nodemailer':
      if (!process.env.GMAIL_APP_PASSWORD) {
        console.error('❌ GMAIL_APP_PASSWORD environment variable not set');
        process.exit(1);
      }
      result = await sendEmail(to, subject, message);
      break;

    case 'sendgrid':
      if (!process.env.SENDGRID_API_KEY) {
        console.error('❌ SENDGRID_API_KEY environment variable not set');
        process.exit(1);
      }
      result = await sendEmailSendGrid(to, subject, message);
      break;

    default:
      console.error(`❌ Unknown service: ${service}`);
      console.log('Available services: resend, nodemailer, sendgrid');
      process.exit(1);
  }

  if (result.success) {
    console.log('✅ Email sent successfully!');
    console.log(`📧 Message ID: ${result.messageId}`);
  } else {
    console.error('❌ Failed to send email:', result.error);
    process.exit(1);
  }
}

// Run the CLI
main().catch(console.error);
