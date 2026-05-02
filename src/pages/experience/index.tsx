import { useData } from '../../hooks/useData'
import { ExperienceSection, EducationSection } from '../resume/ResumeCard'
import { Avatar, Footer, PageTitle, DesktopNav, MobileNav, MenuButton, ThemeToggleButton, SocialLinks } from '../../components'
import { HomeCard } from '../home/HomeCard'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo/renjith.png'

export const Experience = () => {
  const { advanceSkills, familiarSkills, tools, avatars, handleImageChange, setPrivacyPolicyIsOpen } = useData()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => { handleImageChange(false, avatars.greatness) }, [])
  useEffect(() => { if (menuOpen) setPrivacyPolicyIsOpen(false) }, [menuOpen])

  return (
    <main className="relative">
      <PageTitle title="Experience" />

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
              <div className="relative w-full flex items-center justify-center">
                <div className="lg:hidden absolute z-10 top-[10rem] w-[200px]" data-aos="fade-in">
                  <Avatar absolute={false} width="200px" />
                </div>
              </div>

              <div className="container sm:px-5 md:px-10 lg:px-14">
                <div className="py-12 px-4 md:px-0">
                  <h2 data-aos="fade-left" className="after-effect after:left-52 mt-[12rem] lg:mt-0">Experience</h2>
                  <div className="mt-[30px]">
                    <ExperienceSection />
                  </div>
                </div>
              </div>

              <div className="container bg-transparent dark:bg-[#0D0D0D] py-12 px-4 sm:px-5 md:px-10 lg:px-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="col-span-1">
                    <h4 className="text-5xl dark:text-white font-medium mb-6">Advance Skills</h4>
                    <div className="flex gap-y-5 gap-x-2.5 flex-wrap">
                      {advanceSkills.map((skill, idx) => (
                        <button className="resume-btn" key={idx}>{skill}</button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-5">
                    <div className="col-span-1">
                      <h4 className="text-5xl dark:text-white font-medium mb-6">Familiar Skills</h4>
                      <div className="flex gap-y-5 gap-x-2.5 flex-wrap">
                        {familiarSkills.map((skill, idx) => (
                          <button className="resume-btn" key={idx}>{skill}</button>
                        ))}
                      </div>
                    </div>

                    <div className="col-span-1">
                      <h4 className="text-5xl dark:text-white font-medium my-6">Tools</h4>
                      <div className="flex gap-y-5 gap-x-2.5 flex-wrap">
                        {tools.map((tool, idx) => (
                          <button className="resume-btn" key={idx}>{tool}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container sm:px-5 md:px-10 lg:px-14 py-12 px-4">
                <EducationSection />
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
