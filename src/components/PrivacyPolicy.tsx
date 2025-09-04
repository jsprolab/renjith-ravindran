import { RiCloseFill } from 'react-icons/ri'
import { useData } from "../hooks";
import { Modal } from "./Modal";

export function PrivacyPolicy() {
    const { setPrivacyPolicyIsOpen } = useData()

    const closePrivacyPolicy = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        setPrivacyPolicyIsOpen(false)
    }

    return (
        <>
            <Modal label="Privacy Policy">
                <div className="lg:px-[2rem] lg:py-[1rem]">
                    <div className="flex justify-between items-baseline">
                        <h2 className="after-effect after:left-40 mb-5 text-lg">Privacy Policy</h2>
                        <a onClick={closePrivacyPolicy} className='visible hover:text-accent-color dark:hover:text-accent-color bg-primary-bg-light w-[30px] h-[30px] rounded-full flex justify-center items-center text-gray-lite dark:text-white dark:bg-primary-bg-dark text-2xl cursor-pointer transition-all duration-300 ease-in-out'>
                            <RiCloseFill className='rounded-full' />
                        </a>
                    </div>
                    <p className="text-gray-lite dark:text-color-910 leading-7 text-xs"> I, as the developer of this website, respect your privacy and I am committed to protecting your personal information. This privacy policy explains how this website handles information when you visit it.
                        <br />
                        <strong>Information Collection:</strong><br />
                        This website does not collect, store, or track any personal information from visitors. No cookies are used for tracking purposes, and no analytics or tracking services are implemented.
                        <br />

                        <strong>Contact Information:</strong><br />
                        If you choose to contact me through the contact form, I will only use the information you provide to respond to your inquiry. This information is not stored or shared with any third parties.
                        <br />

                        <strong>Third-Party Services:</strong><br />
                        This website does not use any third-party tracking, analytics, or advertising services. Your browsing activity remains private and is not monitored or recorded.
                        <br />

                        <strong>Changes to this privacy policy</strong><br />
                        I may update this privacy policy from time to time. I encourage you to review this page regularly for any updates.
                        <br />

                        <strong>Contact Me</strong><br />
                        If you have any questions or concerns about this privacy policy, please contact me at jobs.renjith@gmail.com.
                        <br />

                        Thank you for visiting my personal website.
                    </p>
                </div>
            </Modal>
        </>
    )
}