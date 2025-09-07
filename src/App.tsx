import { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import AOS from "aos"
import 'aos/dist/aos.css'

import { ToastContainer } from "react-toastify"

import { ContextProvider } from "./context"

import {
  Home,
  About,
  Contact,
  Resume,
  Projects
} from './pages';

import { AdminLogin, AdminDashboard } from './pages/admin';


function App() {

  useEffect(() => {
    // Handle GitHub Pages SPA routing
    // Check if we're on GitHub Pages and need to handle the URL format
    const currentUrl = window.location.href;
    console.log('🔍 Current URL:', currentUrl);
    console.log('🔍 Current pathname:', window.location.pathname);
    
    if (currentUrl.includes('/?/')) {
      const path = currentUrl.split('/?/')[1];
      console.log('🔍 Extracted path:', path);
      if (path) {
        // Decode the path and navigate to it
        const decodedPath = path.replace(/~and~/g, '&');
        // Remove any query parameters from the decoded path
        const cleanPath = decodedPath.split('?')[0];
        console.log('🔍 Clean path:', cleanPath);
        // Update the URL without reloading
        window.history.replaceState(null, '', '/' + cleanPath);
        console.log('🔍 New pathname:', window.location.pathname);
      }
    }
  }, []);

  useEffect(() => {

    AOS.init({ duration: 1200 });
    let timerId : any = null;
    let listenerDidInit = true;
    const refreshAos = () => {
      timerId = setTimeout(() => {
        AOS.refresh()
      }, 1200)
     }
    if (document.readyState !== 'loading') {
      refreshAos();
      listenerDidInit = false
    } else{
      document.addEventListener("DOMContentLoaded", refreshAos) 
    }
    return () =>{
      clearTimeout(timerId)
      if (listenerDidInit) document.removeEventListener("DOMContentLoaded", refreshAos)
    }
  }, [])

  return (
    <>
      <div style={{position: 'fixed', top: 0, left: 0, background: 'red', color: 'white', padding: '10px', zIndex: 9999}}>
        React App Loading - Path: {window.location.pathname}
      </div>
      <ContextProvider>
        <Router basename="/">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="projects" element={<Projects />} />
            <Route path='resume' element={<Resume />} />
            <Route path='contact' element={<Contact />} />
            <Route path='admin' element={<AdminLogin />} />
            <Route path='admin/dashboard' element={<AdminDashboard />} />
          </Routes>
        </Router>
      </ContextProvider>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
    </>
  );
}

export default App
