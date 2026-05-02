import { Footer, PageTitle } from '../../components'
import { HomeCard } from '../home/HomeCard';
import { useData } from '../../hooks';
import { useEffect } from 'react';

const AboutMeParagraph = () => {
  return (
    <div className="text-gray-lite dark:text-color-910 leading-7 space-y-4">
      <p>
        Visionary front-end architect and senior technology leader with <strong className="dark:text-white">18+ years of experience</strong> engineering mission-critical digital platforms at global scale. Currently serving as <strong className="dark:text-white">Senior Software Engineer III & Principal UI Architect</strong> at Castlight Health, where I lead front-end engineering for enterprise digital-health platforms serving millions of employer-sponsored users.
      </p>
      <p>
        My career has been defined by delivering transformative systems at organizations including <strong className="dark:text-white">Google, Target, and Castlight Health</strong> — platforms that collectively serve hundreds of millions of users and drive billions in commercial revenue. I spearheaded <strong className="dark:text-white">Curelight</strong>, a vaccine-finder platform integrated with CDC Vaccines.gov that reached <strong className="dark:text-white">100M+ users</strong> since 2021, directly supporting the U.S. government's COVID-19 pandemic response.
      </p>
      <p>
        At Google, I headed an 8-member engineering team across Google Maps, Google My Business, Stadia, Chromecast, and gTech Ads — serving as a <strong className="dark:text-white">Certified Google JavaScript Code Reviewer</strong>. At Target, I led front-end engineering for the <strong className="dark:text-white">$1.8B Everest Redesign</strong> — the largest digital re-platforming in Target's history.
      </p>
      <p>
        A published researcher with <strong className="dark:text-white">18+ peer-reviewed publications</strong>, invited judge at 8 international IEEE conferences, and <strong className="dark:text-white">IEEE Senior Member</strong> (top ~10% globally). IETE Fellow, Sigma Xi Associate Member, and NSPE Member.
      </p>
    </div>
  )
}

export const About = () => {
  const { avatars, handleImageChange } = useData()

  useEffect(() => {
    handleImageChange(false, avatars.idea)
  }, [])
  return (
    <section>
      <PageTitle title="About"></PageTitle>
      {/* End pagetitle */}

      <div className=" lg:rounded-2xl bg-white dark:bg-[#111111] overflow-hidden mb-[2rem]">
        <div>
          <div className="pt-12 md:py-12 px-2 sm:px-5 md:px-10 lg:px-14 ">
            {/* About page title */}
            <h2 className="after-effect after:left-52 lg:block hidden">
              About Me
            </h2>
            <div className="lg:hidden">
              {/* Sidebar personal information for mobile devices */}
              <div>
                <HomeCard />
              </div>
              <div className=" md:gap-10 mb-12 md:pt-[30px] items-center lg:hidden px-6">
                <h2 className="after-effect after:left-52 mb-5">About Me</h2>
                <div className="col-span-12 space-y-2.5">
                  <div className="lg:mr-16">
                    <AboutMeParagraph />
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:grid grid-cols-12 md:gap-10 pt-4 md:pt-[30px] items-center hidden ">
              <div className="col-span-12 space-y-2.5">
                <div className="lg:mr-16">
                  <AboutMeParagraph />
                </div>
              </div>
            </div>
          </div>
          {/* End about descriptions */}

          {/* Common Footer call here */}
          <div className='pb-10'>
            <Footer />
          </div>
        </div>
      </div>
    </section>
  )
}