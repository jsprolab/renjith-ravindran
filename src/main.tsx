import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { HelmetProvider } from 'react-helmet-async';

// Add error boundary and debugging
console.log('Main.tsx loading...');

try {
  const rootElement = document.getElementById('root');
  console.log('Root element found:', rootElement);
  
  if (!rootElement) {
    throw new Error('Root element not found');
  }

  const root = ReactDOM.createRoot(rootElement);
  console.log('React root created:', root);

  root.render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
  
  console.log('React app rendered successfully');
} catch (error) {
  console.error('Error in main.tsx:', error);
  
  // Fallback rendering
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; color: red; background: yellow; border: 2px solid red;">
        <h2>React App Failed to Load</h2>
        <p>Error: ${error instanceof Error ? error.message : String(error)}</p>
        <p>Check console for more details</p>
      </div>
    `;
  }
}
