import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// Simple test component
const TestComponent = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: 'red', color: 'white', fontSize: '24px' }}>
      <h1>REACT IS WORKING!</h1>
      <p>If you can see this, React is rendering properly.</p>
      <p>Check the browser console for any errors.</p>
    </div>
  );
};

console.log('JavaScript is loading...');
console.log('Root element:', document.getElementById('root'));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <TestComponent />
)
