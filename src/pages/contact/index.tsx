import { ContactForm } from "./ContactForm";

import { Footer, PageTitle, DesktopNav, MobileNav, MenuButton, ThemeToggleButton, SocialLinks } from '../../components';
import { useEffect, useState } from "react";
import { useData } from "../../hooks";
import { Avatar } from "../../components";
import { Link } from 'react-router-dom';
import logo from '../../assets/logo/renjith.png';
import { HomeCard } from '../home/HomeCard';


export const Contact = () => {
    const { avatars, handleImageChange, setPrivacyPolicyIsOpen } = useData()
    const [menuOpen, setMenuOpen] = useState(false);
    
    useEffect(() => {
        handleImageChange(false, avatars.fist)
    }, [])

    useEffect(() => {
        if (menuOpen) {
            setPrivacyPolicyIsOpen(false)
        }
    }, [menuOpen])

    return (
        <main className="relative">
            <PageTitle title="Contact" />
            {/* End pagetitle */}

            <section className="z-[100] bg-white dark:bg-black min-h-screen bg-no-repeat bg-center bg-cover bg-fixed w-full">
                <div className="container z-[1000] w-full bg-primary-bg-light dark:bg-primary-bg-dark lg:bg-transparent lg:dark:bg-transparent flex justify-between py-5 lg:px-0 lg:pt-[35px]">
                    <div className="w-full z-[1000] flex justify-between items-center px-4">
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
                        <section id="contact" className="lg:mb-20 overflow-hidden">
                <div className="relative w-full flex items-center justify-center">
                    <div className="lg:hidden absolute z-10 top-[10rem] w-[200px]">
                        <Avatar absolute={false} width="200px" />
                    </div>
                </div>
                <div className="bg-white lg:rounded-2xl dark:bg-[#111111]">
                    {/* Contact page title */}
                    <h2 className="after-effect after:left-60 after:top-[76px] mt-[12rem] lg:mt-0 mb-12 lg:mb-6 md:mb-[30px] pl-4 md:pl-[60px] pt-12">
                        Contact
                    </h2>

                    <ContactForm condition={true} />
                    <div className="pb-8">
                        <Footer />
                    </div>
                </div>
            </section>
            </div>
            </div>
            </section>
            <div data-aos="fade-up" className='socialSm:fixed hidden socialSm:flex flex-col items-center bg-transparent button-vertical-after after:h-40 after:translate-y-[7rem] bottom-0 left-0 w-[10%] h-[25%]'>
                <SocialLinks />
            </div>
        </main>
    )
}