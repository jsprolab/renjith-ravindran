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
    const handleGitHubPagesRouting = () => {
      // Check if we have a stored path from the 404.html redirect
      const storedPath = sessionStorage.getItem('github-pages-path');
      
      if (storedPath) {
        // Clear the stored path
        sessionStorage.removeItem('github-pages-path');
        
        // Navigate to the stored path
        window.history.replaceState(null, '', storedPath);
        return;
      }
    };

    // Run the routing handler
    handleGitHubPagesRouting();
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
            {/* Fallback route for any unmatched paths */}
            <Route path="*" element={<Home />} />
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
