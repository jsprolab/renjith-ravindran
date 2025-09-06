# 🚀 Admin Dashboard Setup Guide

## 📋 What's Been Created:

### ✅ **Database Integration**
- MongoDB Atlas connection
- Contact submissions storage
- Admin user management

### ✅ **Authentication System**
- JWT token-based authentication
- Secure password hashing
- Protected admin routes

### ✅ **Admin Dashboard**
- Login page at `/admin`
- Dashboard at `/admin/dashboard`
- Contact management interface
- Status updates and filtering

## 🔧 Setup Instructions:

### **Step 1: Set Up MongoDB Atlas (FREE)**

1. **Go to**: https://www.mongodb.com/atlas
2. **Sign up** for free account
3. **Create a new cluster** (free tier)
4. **Get connection string**:
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password

### **Step 2: Add Environment Variables to Vercel**

1. **Go to Vercel Dashboard** → Your Project → Settings → Environment Variables
2. **Add these variables**:

```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
JWT_SECRET = your-super-secret-jwt-key-change-this-in-production
```

3. **Set for all environments**: Production, Preview, Development

### **Step 3: Create Admin User**

1. **Deploy the changes** (wait for deployment)
2. **Run setup script**:
   ```bash
   npm run setup-admin
   ```
3. **Default credentials**:
   - Username: `admin`
   - Email: `jobs.renjith@gmail.com`
   - Password: `admin123`

### **Step 4: Access Admin Dashboard**

1. **Go to**: `http://renjith.online/admin`
2. **Login** with admin credentials
3. **Access dashboard** at `/admin/dashboard`

## 🎯 Features:

### **Contact Management**
- ✅ **View all submissions** with pagination
- ✅ **Search contacts** by name, email, or message
- ✅ **Filter by status** (new, read, replied, archived)
- ✅ **Update status** with dropdown
- ✅ **Reply via email** (click email icon)
- ✅ **Delete contacts** (with confirmation)

### **Admin Features**
- ✅ **Secure login** with JWT tokens
- ✅ **Session management** (7-day tokens)
- ✅ **Responsive design** for mobile/desktop
- ✅ **Real-time updates** without page refresh

### **Database Features**
- ✅ **Automatic timestamps** for all records
- ✅ **IP address tracking** for security
- ✅ **User agent logging** for analytics
- ✅ **Indexed fields** for fast queries

## 🔐 Security:

### **Authentication**
- JWT tokens with 7-day expiration
- Password hashing with bcrypt (12 rounds)
- Protected API endpoints
- Automatic logout on token expiry

### **Data Protection**
- Input validation and sanitization
- CORS headers for API security
- Error handling without data exposure
- Secure password storage

## 📊 Database Schema:

### **Contact Collection**
```javascript
{
  name: String (required),
  email: String (required, indexed),
  message: String (required),
  status: String (new|read|replied|archived),
  ip: String,
  userAgent: String,
  createdAt: Date,
  updatedAt: Date
}
```

### **Admin Collection**
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (hashed),
  role: String (admin|super_admin),
  lastLogin: Date,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Next Steps:

1. **Set up MongoDB Atlas** (5 minutes)
2. **Add environment variables** to Vercel
3. **Deploy and create admin user**
4. **Change default password** after first login
5. **Start managing contacts**!

## 💰 Cost:

- ✅ **MongoDB Atlas**: FREE (512MB storage)
- ✅ **Vercel**: FREE (within limits)
- ✅ **Total Cost**: $0

The admin dashboard is now ready! You'll have a professional contact management system for your portfolio.
