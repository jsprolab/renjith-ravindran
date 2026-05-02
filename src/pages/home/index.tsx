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
import { Logo } from '../../components'

export const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { setPrivacyPolicyIsOpen, local } = useData();

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
      <PageTitle
        title="Home"
        description="Renjith Kathalikkattil Ravindran — Senior Software Engineer III and Principal UI Architect with 18+ years of experience building enterprise-scale digital platforms. Expert in React, Next.js, Angular, TypeScript, micro-frontends, and design systems. Castlight Health, Google, Target. IEEE Senior Member. Fremont, CA."
        path="/"
      />
      {/* End pagetitle */}

      <section className="z-[100] bg-white dark:bg-black min-h-screen bg-no-repeat bg-center bg-cover bg-fixed w-full">
        <div className={`container z-[1000] w-full bg-primary-bg-light dark:bg-primary-bg-dark lg:bg-transparent lg:dark:bg-transparent flex justify-between py-5 lg:px-0 lg:pt-[35px]`}>
          <div className={`w-full z-[1000] flex justify-between items-center px-4`}>
            {/* website logo */}
            <Link to="/">
              <Logo />
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

