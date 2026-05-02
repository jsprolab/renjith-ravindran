import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Footer, PageTitle, DesktopNav, MobileNav, MenuButton, ThemeToggleButton, SocialLinks } from '../../components'
import { HomeCard } from '../home/HomeCard'
import { useData } from '../../hooks'
import ResumeDoc from '../../assets/resume/Renjith_Ravindran.pdf'
import downloadIcon from '../../assets/icons/download.png'
import logo from '../../assets/logo/renjith.png'
import { AiOutlineFilePdf, AiOutlineDownload } from 'react-icons/ai'

export const Resume = () => {
  const { avatars, handleImageChange, setPrivacyPolicyIsOpen } = useData()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => { handleImageChange(false, avatars.idea) }, [])
  useEffect(() => { if (menuOpen) setPrivacyPolicyIsOpen(false) }, [menuOpen])

  return (
    <main className="relative">
      <PageTitle
        title="Resume"
        description="Download or view the resume of Renjith Kathalikkattil Ravindran — Senior Software Engineer III and Principal UI Architect. 18+ years experience in React, Next.js, Angular, TypeScript, front-end architecture, and enterprise digital health platforms."
        path="/resume"
      />

      <section className="z-[100] bg-white dark:bg-black min-h-screen bg-no-repeat bg-center bg-cover bg-fixed w-full">
        <div className="container z-[1000] w-full bg-primary-bg-light dark:bg-primary-bg-dark lg:bg-transparent lg:dark:bg-transparent flex justify-between py-5 lg:px-0 lg:pt-[35px]">
          <div className="w-full z-[1000] flex justify-between items-center px-4">
            <Link to="/">
              <img className="h-[26px] lg:h-[32px] rounded-md hover:scale-[105%] transition-all duration-50 ease-in-out" src={logo} alt="logo" />
            </Link>
            <div className="flex items-center">
              <ThemeToggleButton />
              <MenuButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            </div>
          </div>
        </div>

        <MobileNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        <div className="container grid grid-cols-12 md:gap-10 justify-between lg:mt-[110px]">
          <div className="col-span-12 lg:col-span-4 hidden lg:block h-auto sticky">
            <HomeCard />
          </div>

          <div className="col-span-12 lg:col-span-8">
            <DesktopNav />

            <section className="bg-white overflow-hidden lg:mb-20 lg:rounded-2xl dark:bg-[#111111]">
              <div className="container sm:px-5 md:px-10 lg:px-14">
                <div className="py-12 px-4 md:px-0">

                  <h2 data-aos="fade-left" className="after-effect after:left-28">Resume</h2>

                  {/* Download button */}
                  <div className="flex items-center gap-4 mt-8 mb-6" data-aos="fade-up">
                    <div className="flex items-center gap-2 text-accent-color">
                      <AiOutlineFilePdf className="h-6 w-6" />
                      <span className="text-sm font-medium dark:text-white text-gray-700">Renjith_Ravindran.pdf</span>
                    </div>
                    <a
                      href={ResumeDoc}
                      download="Renjith_Ravindran.pdf"
                      className="ml-auto flex items-center gap-2 bg-gradient-to-r from-accent-color to-variant-bg text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gradient-to-l transition-all duration-200"
                    >
                      <AiOutlineDownload className="h-4 w-4" />
                      Download CV
                    </a>
                  </div>

                  {/* PDF Viewer — desktop inline */}
                  <div className="hidden md:block w-full rounded-xl overflow-hidden border-2 border-[#EEF5FA] dark:border-[#212425]" data-aos="fade-up">
                    <iframe
                      src={ResumeDoc}
                      title="Renjith K Ravindran Resume"
                      className="w-full"
                      style={{ height: '900px' }}
                    />
                  </div>

                  {/* Mobile fallback */}
                  <div className="md:hidden mt-4" data-aos="fade-up">
                    <div className="p-6 rounded-xl border-2 border-[#EEF5FA] dark:border-[#212425] text-center">
                      <AiOutlineFilePdf className="h-16 w-16 text-accent-color mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                        Tap below to view or download the full resume PDF.
                      </p>
                      <div className="flex flex-col gap-3">
                        <a
                          href={ResumeDoc}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 border-2 border-accent-color text-accent-color px-6 py-3 rounded-full text-sm font-medium hover:bg-accent-color hover:text-white transition-all duration-200"
                        >
                          <AiOutlineFilePdf className="h-4 w-4" />
                          View PDF
                        </a>
                        <a
                          href={ResumeDoc}
                          download="Renjith_Ravindran.pdf"
                          className="flex items-center justify-center gap-2 bg-gradient-to-r from-accent-color to-variant-bg text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gradient-to-l transition-all duration-200"
                        >
                          <AiOutlineDownload className="h-4 w-4" />
                          Download CV
                        </a>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div className="pb-20">
                <Footer />
              </div>
            </section>
          </div>
        </div>
      </section>

      <div data-aos="fade-up" className="socialSm:fixed hidden socialSm:flex flex-col items-center bg-transparent button-vertical-after after:h-40 after:translate-y-[7rem] bottom-0 left-0 w-[10%] h-[25%]">
        <SocialLinks />
      </div>
    </main>
  )
}
