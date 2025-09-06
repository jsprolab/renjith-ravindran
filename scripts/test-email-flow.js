// Test script to verify the complete email flow
const fetch = require('node-fetch');

async function testEmailFlow() {
  console.log('🧪 Testing Complete Email Flow...');
  console.log('Contact Form → API → Send Email');
  console.log('');

  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    message: 'This is a test message from the email flow test script. If you receive this email, the complete flow is working correctly!'
  };

  try {
    console.log('📤 Sending test data to API...');
    console.log('Data:', testData);
    console.log('');

    // Test the API endpoint
    const response = await fetch('https://renjith-ravindran.vercel.app/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();

    if (response.ok) {
      console.log('✅ API Response:', result);
      console.log('');
      console.log('🎉 SUCCESS! Email flow is working correctly!');
      console.log('📧 Check your email at jobs.renjith@gmail.com');
      console.log('📧 Message ID:', result.messageId);
    } else {
      console.log('❌ API Error:', result);
      console.log('');
      console.log('🔧 Troubleshooting:');
      console.log('1. Check if RESEND_API_KEY is set in Vercel');
      console.log('2. Verify the API endpoint is deployed');
      console.log('3. Check Vercel function logs for errors');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('');
    console.log('🔧 Troubleshooting:');
    console.log('1. Check your internet connection');
    console.log('2. Verify the API endpoint URL is correct');
    console.log('3. Make sure the deployment is live');
  }
}

// Run the test
testEmailFlow();
