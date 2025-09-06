// Setup script to create admin user
import connectDB from '../api/lib/mongodb';
import Admin from '../api/models/Admin';

async function createAdminUser() {
  try {
    console.log('🔗 Connecting to database...');
    await connectDB();

    const adminData = {
      username: 'admin',
      email: 'jobs.renjith@gmail.com',
      password: 'admin123', // Change this password!
      role: 'super_admin'
    };

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      $or: [
        { username: adminData.username },
        { email: adminData.email }
      ]
    });

    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log('Username:', existingAdmin.username);
      console.log('Email:', existingAdmin.email);
      return;
    }

    // Create new admin
    const admin = new Admin(adminData);
    await admin.save();

    console.log('✅ Admin user created successfully!');
    console.log('Username:', admin.username);
    console.log('Email:', admin.email);
    console.log('Password:', adminData.password);
    console.log('');
    console.log('🔐 IMPORTANT: Change the password after first login!');
    console.log('🌐 Login at: http://renjith.online/admin');

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    process.exit(0);
  }
}

// Run the script
createAdminUser();
