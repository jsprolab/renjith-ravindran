import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { useData } from '../../hooks'
import { SocialLinks } from '../../components'
import { AiOutlineLoading3Quarters, AiOutlineCheckCircle } from 'react-icons/ai'

type ContactFormProps = {
  condition: boolean
}

export const ContactForm = ({ condition }: ContactFormProps) => {
  const { handleImageChange, avatars } = useData()
  const [inProgress, setInProgress] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // Prevent default form submission and redirect
    setInProgress(true)
    setEmailSent(false)

    try {
      const formData = new FormData(e.currentTarget);
      
      // Validate form data
      const name = formData.get('name')?.toString() || '';
      const email = formData.get('email')?.toString() || '';
      const message = formData.get('message')?.toString() || '';
      
      if (!name || !email || !message) {
        throw new Error('Please fill in all required fields');
      }
      
                  // Use dynamic API URL based on current domain
                  const apiUrl = window.location.hostname === 'renjith.online' 
                    ? 'https://renjith-ravindran.vercel.app/api/send-email-simple'
                    : '/api/send-email-simple';
                  
                  // Create abort controller for timeout
                  const controller = new AbortController();
                  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
                  
                  const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      name,
                      email,
                      message
                    }),
                    signal: controller.signal
                  });
                  
                  clearTimeout(timeoutId);
      
      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        throw new Error('Invalid response from server');
      }
      
      if (response.ok && result && result.success === true) {
        setInProgress(false)
        setEmailSent(true)
        toast.success("Message Sent successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        handleImageChange(false, avatars.success)
        // Reset the form
        e.currentTarget.reset();
      } else {
        const errorMessage = (result && result.message) || 'Failed to send message';
        throw new Error(errorMessage);
      }
    } catch (error) {
      setInProgress(false)
      setEmailSent(false)
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (emailSent) {
      timer = setTimeout(() => {
        setEmailSent(false)
      }, 2000)
    }

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
 
  }, [emailSent])
  return (
    <div
      className={`${condition
        ? "mx-4 md:mx-[60px] p-4 md:p-16 dark:border-[#212425] dark:border-2"
        : "  dark:border-[#212425] dark:border-2 mb-16  md:p-[48px]  p-4  "
        } bg-transparent border-accent-light border-2 rounded-xl dark:bg-[#111111] mb-[30px] md:mb-[60px]`}
    >
      <div data-aos="fade-right" className='w-full flex items-center justify-start my-10 socialSm:hidden button-horizontal-after after:w-40 after:left-[7rem]'>
        <SocialLinks />
      </div>
      <h3 className="text-4xl  ">
        <span className="text-gray-lite dark:text-[#A6A6A6] ">
          I'm always open to discussing opportunities.
        </span>
      </h3>

      {/* Form Start */}
      <form 
        id="myForm" 
        onSubmit={handleSubmit}
      >
        {/* Hidden honeypot field to prevent spam */}
        <input type="hidden" name="_gotcha" style={{display: 'none !important'}} />
        <div className="relative  z-0 w-full mt-[40px] mb-8 group">
          <input
            type="text"
            name="name"
            className="block autofill:bg-transparent py-2.5 px-2 w-full text-sm text-gray-lite bg-transparent border-0 border-b-[2px] border-[#B5B5B5] appearance-none dark:text-white dark:border-[#333333] dark:focus:border-accent-color focus:outline-none focus:ring-0 focus:border-accent-color peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-color-910 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-accent-color peer-focus:dark:text-accent-color peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10"
          >
            Name *
          </label>
        </div>
        <div className="relative z-0 w-full mb-8 group">
          <input
            type="email"
            name="email"
            className="block autofill:text-red-900 needed py-2.5 px-2 w-full text-sm text-gray-lite bg-transparent border-0 border-b-[2px] border-[#B5B5B5] appearance-none dark:text-white dark:border-[#333333] dark:focus:border-accent-color focus:outline-none focus:ring-0 focus:border-accent-color peer"
            placeholder=" "
            id="email"
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-color-910 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-accent-color peer-focus:dark:text-accborder-accent-color peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10"
          >
            Email *
          </label>
        </div>
        <div className="relative z-0 w-full mb-8 group">
          <textarea
            name="message"
            className="block autofill:bg-yellow-200 py-2.5 px-2 w-full text-sm text-gray-lite bg-transparent border-0 border-b-[2px] border-[#B5B5B5] appearance-none dark:text-white dark:border-[#333333] dark:focus:border-accent-color focus:outline-none focus:ring-0 focus:border-varitext-variant-bg peer"
            placeholder=" "
            id="message"
            required
            rows={3}
          ></textarea>
          <label
            htmlFor="message"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-color-910 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-variant-bg peer-focus:dark:text-accborder-accent-color peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10"
          >
            Message *
          </label>
        </div>

        <div className="transition-all duration-300  ease-in-out inline-block hover:bg-gradient-to-r from-accent-color to-variant-bg rounded-lg  mt-3">
            <button
              type="submit"
              className="transition ease-in duration-200 font-semibold cursor-pointer border-color-910   hover:border-transparent w-[8rem] h-[3rem] rounded-lg border-[2px]  hover:text-white   dark:text-white flex items-center justify-center"
            >
              {
                inProgress
                ? <AiOutlineLoading3Quarters size={30} className='animate-spin' color='#fff' />
                :
                emailSent 
                ? <AiOutlineCheckCircle size={30} color='#fff' />
                : "Submit" 
              }
            </button>
        </div>
      </form>
    </div>
  )
}