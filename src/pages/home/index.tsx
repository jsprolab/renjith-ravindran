import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { HomeCard } from './HomeCard';
import { 
  PageTitle, 
  DesktopNav, 
  PrivacyPolicy, 
  SocialLinks, 
  MobileNav, 
  MenuButton, 
  ThemeToggleButton
} from '../../components'
import { About } from '../about'

import { useData } from '../../hooks'
import logo from '../../assets/logo/renjith.png'

export const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Add debug logging
  console.log('Home component rendering...');
  
  let setPrivacyPolicyIsOpen, local;
  try {
    const data = useData();
    setPrivacyPolicyIsOpen = data.setPrivacyPolicyIsOpen;
    local = data.local;
    console.log('useData() successful:', data);
  } catch (error) {
    console.error('useData() failed:', error);
    return (
      <div style={{ 
        padding: '20px', 
        color: 'red', 
        backgroundColor: 'yellow',
        border: '2px solid red',
        fontSize: '16px',
        position: 'fixed',
        top: '100px',
        left: '0',
        right: '0',
        zIndex: '9999'
      }}>
        <h2>ERROR: Home component - useData() failed</h2>
        <p>Error: {error instanceof Error ? error.message : String(error)}</p>
      </div>
    );
  }

  const openPrivacyPolicy = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setPrivacyPolicyIsOpen(true)
  }

  useEffect(() => {
    if (menuOpen) {
      setPrivacyPolicyIsOpen(false)
    }
  }, [menuOpen])
  return (
    <main className={`relative`}>
      <PageTitle title="Home"></PageTitle>
      {/* End pagetitle */}

      <section className="z-[100] bg-white dark:bg-black min-h-screen bg-no-repeat bg-center bg-cover bg-fixed w-full">
        <div className={`container z-[1000] w-full bg-primary-bg-light dark:bg-primary-bg-dark lg:bg-transparent lg:dark:bg-transparent flex justify-between py-5 lg:px-0 lg:pt-[35px]`}>
          <div className={`w-full z-[1000] flex justify-between items-center px-4`}>
            {/* website logo */}
            <Link to="/">
              <img className="h-[26px] lg:h-[32px] rounded-md hover:scale-[105%] transition-all duration-50 ease-in-out" src={logo} alt="logo" />
            </Link>
            <div className="flex items-center">
              {/* dark and light mode button */}
              <ThemeToggleButton />

              {/* mobile menu button */}
              <MenuButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            </div>
          </div>
        </div>
        <MobileNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <div className="container grid grid-cols-12 md:gap-10 justify-between lg:mt-[110px] ">
          <div className="col-span-12 lg:col-span-4 hidden lg:block h-auto sticky">
            <HomeCard />
          </div>
          <div className="col-span-12 lg:col-span-8  ">
            {/* header  */}
            <DesktopNav />

            {/* Content */}
            <About />
          </div>
        </div>
      </section>
      <div data-aos="fade-up" className='socialSm:fixed hidden socialSm:flex flex-col items-center bg-transparent button-vertical-after after:h-40 after:translate-y-[7rem] bottom-0 left-0 w-[10%] h-[25%]'>
        <SocialLinks />
      </div>
      <PrivacyPolicy />
    </main>
  )
}

