import { lazy, Suspense, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import AOS from "aos"
import 'aos/dist/aos.css'

import { ToastContainer } from "react-toastify"
import { ContextProvider } from "./context"

// Route-based code splitting — each page loads only when navigated to
const Home        = lazy(() => import('./pages/home').then(m => ({ default: m.Home })))
const About       = lazy(() => import('./pages/about').then(m => ({ default: m.About })))
const Contact     = lazy(() => import('./pages/contact').then(m => ({ default: m.Contact })))
const Resume      = lazy(() => import('./pages/resume').then(m => ({ default: m.Resume })))
const Experience  = lazy(() => import('./pages/experience').then(m => ({ default: m.Experience })))
const Projects    = lazy(() => import('./pages/projects').then(m => ({ default: m.Projects })))
const Publications = lazy(() => import('./pages/publications').then(m => ({ default: m.Publications })))

const AdminLogin     = lazy(() => import('./pages/admin').then(m => ({ default: m.AdminLogin })))
const AdminDashboard = lazy(() => import('./pages/admin').then(m => ({ default: m.AdminDashboard })))
const AdminSettings  = lazy(() => import('./pages/admin').then(m => ({ default: m.AdminSettings })))

function App() {
  useEffect(() => {
    AOS.init({ duration: 1200 });
    let timerId: any = null;
    let listenerDidInit = true;
    const refreshAos = () => {
      timerId = setTimeout(() => { AOS.refresh() }, 1200)
    }
    if (document.readyState !== 'loading') {
      refreshAos();
      listenerDidInit = false
    } else {
      document.addEventListener("DOMContentLoaded", refreshAos)
    }
    return () => {
      clearTimeout(timerId)
      if (listenerDidInit) document.removeEventListener("DOMContentLoaded", refreshAos)
    }
  }, [])

  return (
    <>
      <ContextProvider>
        <Router basename="/">
          <Suspense fallback={<div className="min-h-screen bg-white dark:bg-black" />}>
            <Routes>
              <Route path='/'                  element={<Home />} />
              <Route path='about'              element={<About />} />
              <Route path='projects'           element={<Projects />} />
              <Route path='resume'             element={<Resume />} />
              <Route path='experience'         element={<Experience />} />
              <Route path='contact'            element={<Contact />} />
              <Route path='publications'       element={<Publications />} />
              <Route path='admin'              element={<AdminLogin />} />
              <Route path='admin/dashboard'    element={<AdminDashboard />} />
              <Route path='admin/settings'     element={<AdminSettings />} />
              <Route path='*'                  element={<Home />} />
            </Routes>
          </Suspense>
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
