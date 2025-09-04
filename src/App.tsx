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

function App() {

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
      <div style={{ 
        position: 'fixed', 
        top: '10px', 
        left: '10px', 
        background: 'red', 
        color: 'white', 
        padding: '10px', 
        zIndex: '10000',
        fontSize: '12px'
      }}>
        DEBUG: React App is rendering
      </div>
      <div style={{ 
        position: 'fixed', 
        top: '50px', 
        left: '10px', 
        background: 'blue', 
        color: 'white', 
        padding: '10px', 
        zIndex: '10000',
        fontSize: '12px'
      }}>
        <div className="text-white bg-green-500 p-2">Tailwind Test</div>
      </div>
      <ContextProvider>
        <Router>
          <div style={{ 
            position: 'fixed', 
            top: '200px', 
            left: '10px', 
            background: 'purple', 
            color: 'white', 
            padding: '10px', 
            zIndex: '10001',
            fontSize: '12px'
          }}>
            Router is working
          </div>
          <Routes>
            <Route path='/' element={
              <div>
                <div style={{ 
                  position: 'fixed', 
                  top: '250px', 
                  left: '10px', 
                  background: 'orange', 
                  color: 'white', 
                  padding: '10px', 
                  zIndex: '10001',
                  fontSize: '12px'
                }}>
                  About to render Home component
                </div>
                <Home />
              </div>
            } />
            <Route path="about" element={<About />} />
            <Route path="projects" element={<Projects />} />
            <Route path='resume' element={<Resume />} />
            <Route path='contact' element={<Contact />} />
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
