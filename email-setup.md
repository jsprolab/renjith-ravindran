# Email Setup Instructions

## Environment Variables Required

Add these environment variables to your Vercel project:

### 1. Go to Vercel Dashboard
- Navigate to your project
- Go to Settings → Environment Variables
- Add the following variables:

### 2. Required Variables:

```
EMAIL_USER=jobs.renjith@gmail.com
EMAIL_PASS=your_gmail_app_password
```

### 3. Gmail App Password Setup:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Go to Google Account Settings** → Security
3. **Generate App Password**:
   - Select "Mail" as the app
   - Select "Other" as the device
   - Enter "Portfolio Contact Form" as the name
   - Copy the generated 16-character password
4. **Use this password** as `EMAIL_PASS` in Vercel

### 4. Vercel Environment Variables:

- **Variable Name**: `EMAIL_USER`
- **Value**: `jobs.renjith@gmail.com`
- **Environment**: Production, Preview, Development

- **Variable Name**: `EMAIL_PASS`
- **Value**: `your_16_character_app_password`
- **Environment**: Production, Preview, Development

## How It Works:

1. User submits contact form
2. API processes the submission
3. Email is sent to `jobs.renjith@gmail.com`
4. User receives confirmation
5. You receive email notification

## Email Features:

- **HTML formatted** email with styling
- **Contact details** clearly displayed
- **Reply button** to respond directly
- **Timestamp** and source information
- **Professional formatting**
