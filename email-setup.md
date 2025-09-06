# Email Setup Instructions - Resend (No App Password Needed!)

## ✅ Much Easier Setup with Resend

**Benefits:**
- ✅ **No Gmail App Password needed**
- ✅ **Just one API key**
- ✅ **3,000 emails/month FREE**
- ✅ **5-minute setup**
- ✅ **Professional emails**

## Step 1: Create Resend Account

1. **Go to**: https://resend.com/
2. **Click "Get Started"**
3. **Sign up** with your email
4. **Verify your email** (check inbox)

## Step 2: Get API Key

1. **Go to**: https://resend.com/api-keys
2. **Click "Create API Key"**
3. **Name it**: "Portfolio Contact Form"
4. **Copy the API key** (starts with `re_`)

## Step 3: Add to Vercel

1. **Go to Vercel Dashboard** → Your Project → Settings → Environment Variables
2. **Add this variable**:

```
Variable Name: RESEND_API_KEY
Value: re_your_api_key_here
Environment: Production, Preview, Development
```

## Step 4: Deploy

1. **Commit and push** your changes
2. **Wait for deployment** (2-3 minutes)
3. **Test your contact form**

## How It Works:

1. User submits contact form
2. Resend API sends email to `jobs.renjith@gmail.com`
3. User receives confirmation
4. You receive professional email notification

## Email Features:

- **HTML formatted** email with styling
- **Contact details** clearly displayed
- **Reply button** to respond directly
- **Timestamp** and source information
- **Professional formatting**
- **No Gmail setup required**

## Troubleshooting:

**If emails don't work:**
- Check if `RESEND_API_KEY` is set in Vercel
- Verify the API key is correct
- Check Vercel function logs for errors

**Free Tier Limits:**
- 3,000 emails per month
- 100 emails per day
- Perfect for portfolio websites
