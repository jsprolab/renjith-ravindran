import React from 'react'
import ReactDOM from 'react-dom/client'
import TestApp from './TestApp'
import './index.css'

import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HelmetProvider>
    <TestApp />
  </HelmetProvider>,
)
