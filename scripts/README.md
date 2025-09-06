# 📧 Node.js Email Scripts

This directory contains various Node.js scripts for sending emails using different services.

## 🚀 Quick Start

### 1. Resend (Recommended - Easiest)

```bash
# Set environment variable
export RESEND_API_KEY=re_your_api_key_here

# Send email
npm run send-email-resend

# Or use CLI
node scripts/email-cli.js resend jobs.renjith@gmail.com "Test Subject" "Hello World"
```

### 2. Nodemailer (Gmail SMTP)

```bash
# Set environment variable
export GMAIL_APP_PASSWORD=your_gmail_app_password

# Send email
npm run send-email

# Or use CLI
node scripts/email-cli.js nodemailer jobs.renjith@gmail.com "Test Subject" "Hello World"
```

### 3. SendGrid

```bash
# Set environment variable
export SENDGRID_API_KEY=SG.your_api_key_here

# Send email
npm run send-email-sendgrid

# Or use CLI
node scripts/email-cli.js sendgrid jobs.renjith@gmail.com "Test Subject" "Hello World"
```

## 📋 Available Scripts

| Script | Service | Setup Required | Free Tier |
|--------|---------|----------------|-----------|
| `send-email-resend.js` | Resend | API Key | 3,000 emails/month |
| `send-email.js` | Nodemailer | Gmail App Password | Unlimited |
| `send-email-sendgrid.js` | SendGrid | API Key | 100 emails/day |

## 🔧 Setup Instructions

### Resend Setup (Easiest)

1. **Sign up**: https://resend.com/
2. **Get API key**: https://resend.com/api-keys
3. **Set environment variable**:
   ```bash
   export RESEND_API_KEY=re_your_api_key_here
   ```

### Gmail Setup (Nodemailer)

1. **Enable 2FA** on Gmail
2. **Generate App Password**: Google Account → Security → App passwords
3. **Set environment variable**:
   ```bash
   export GMAIL_APP_PASSWORD=your_16_character_password
   ```

### SendGrid Setup

1. **Sign up**: https://sendgrid.com/
2. **Get API key**: SendGrid Dashboard → Settings → API Keys
3. **Set environment variable**:
   ```bash
   export SENDGRID_API_KEY=SG.your_api_key_here
   ```

## 💻 Usage Examples

### Programmatic Usage

```javascript
// Using Resend
const { sendEmailResend } = require('./scripts/send-email-resend');
await sendEmailResend('jobs.renjith@gmail.com', 'Subject', 'Message');

// Using Nodemailer
const { sendEmail } = require('./scripts/send-email');
await sendEmail('jobs.renjith@gmail.com', 'Subject', 'Message');

// Using SendGrid
const { sendEmailSendGrid } = require('./scripts/send-email-sendgrid');
await sendEmailSendGrid('jobs.renjith@gmail.com', 'Subject', 'Message');
```

### CLI Usage

```bash
# Send test email
node scripts/email-cli.js resend jobs.renjith@gmail.com "Test" "Hello from Node.js"

# Send contact form notification
node scripts/email-cli.js resend jobs.renjith@gmail.com "New Contact" "Name: John\nEmail: john@example.com\nMessage: Hello!"
```

## 🎯 Features

- ✅ **Multiple email services** supported
- ✅ **HTML and text** email formatting
- ✅ **Error handling** and logging
- ✅ **CLI interface** for easy testing
- ✅ **Environment variable** configuration
- ✅ **Professional email** templates
- ✅ **Contact form** specific functions

## 🔍 Troubleshooting

### Common Issues

1. **"API key not found"**
   - Make sure environment variable is set
   - Check variable name spelling

2. **"Authentication failed"**
   - Verify API key is correct
   - Check if service account is active

3. **"Rate limit exceeded"**
   - Check free tier limits
   - Wait before sending more emails

### Debug Mode

```bash
# Enable debug logging
DEBUG=* node scripts/send-email-resend.js
```

## 📚 API Reference

### sendEmailResend(to, subject, message, fromName)
- **to**: Email address to send to
- **subject**: Email subject line
- **message**: Email body content
- **fromName**: Sender name (optional)

### sendEmail(to, subject, message, fromName)
- Same parameters as above
- Uses Gmail SMTP via Nodemailer

### sendEmailSendGrid(to, subject, message, fromName)
- Same parameters as above
- Uses SendGrid API

## 🚀 Next Steps

1. **Choose your preferred service** (Resend recommended)
2. **Set up the API key** or app password
3. **Test with a simple email**
4. **Integrate into your application**

Happy emailing! 📧
