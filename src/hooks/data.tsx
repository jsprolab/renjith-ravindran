import { useState, useEffect, ReactNode, useCallback } from "react"

import { Link, useLocation } from "react-router-dom"

import { FaRegUser } from "react-icons/fa"
import { CgNotes } from "react-icons/cg"
import { RiContactsBookLine } from "react-icons/ri"

import avatarIdea from '../assets/about/avatar-idea.png'
import avatarCoding from '../assets/about/avatar-coding.png'
import avatarFist from '../assets/about/avatar-fist.png'
import avatarSuccess from '../assets/about/avatar-success.png'
import avatarGreatness from '../assets/about/avatar-greatness.png'
import { FiCodesandbox } from "react-icons/fi"

export type DataReturnType = ReturnType<typeof data>

export const data = () => {
    const [check, setCheck] = useState(false)
    const [local, setLocal] = useState(localStorage.getItem("theme"))
    const [currentImgSelection, setCurrentImgSelection] = useState(avatarIdea)
    const [privacyPolicyIsOpen, setPrivacyPolicyIsOpen] = useState(false)

    useEffect(() => {
        const themeValue = localStorage?.getItem("theme");

        if (!themeValue) {
            setCheck(true)
            localStorage.setItem("theme", "light") //Default Theme
        } else {
            themeValue === "dark" && setCheck(false)
            themeValue === "light" && setCheck(true)
        }

        localStorage?.getItem("theme") === "dark" 
            ? document.documentElement.classList.add("dark")
            : document.documentElement.classList.remove("dark")
    }, [])

    const handleTheme = (value : string) => {
        if (value !== "dark" && value !== "light") {
            return
        }
        value === "dark"
            ? setCheck(false)
            : setCheck(true)
        localStorage.setItem("theme", value)
        setLocal(value)

        localStorage?.getItem("theme") === "dark"
            ? document.documentElement.classList.add("dark")
            : document.documentElement.classList.remove("dark")
    }

    const avatars = {
        idea: avatarIdea,
        coding: avatarCoding,
        fist: avatarFist,
        success: avatarSuccess,
        greatness: avatarGreatness
    }

    const handleImageChange = useCallback((isRandom : boolean = true, selection : string = '') => {

        if (isRandom) {
            setCurrentImgSelection((prev) => {
                const keyArray = Object.keys(avatars).filter(key => avatars[key] !== prev)
                const randomKeyIdx = Math.floor(Math.random() * keyArray.length)
                const randomKey = keyArray[randomKeyIdx]
                return avatars[randomKey]
              })
              return;
        }

        if (selection) {
            setCurrentImgSelection(selection)
            return;
        }

    }, []
)   

    // Menu Items

    const menuItems = [
        {
          id: "01",
          name: "About",
          link: "/",
          icon: <FaRegUser />,
        },
        // {
        //   id: "02",
        //   name: "Projects",
        //   link: "/projects",
        //   icon: <FiCodesandbox />,
        // },
        {
          id: "03",
          name: "Resume",
          link: "/resume",
          icon: <CgNotes />,
        },
        {
          id: "04",
          name: "Contact",
          link: "/contact",
          icon: <RiContactsBookLine />,
        },
      ];

      const educationArray = [
        {
            id: 2,
            date: "2016-2017",
            title: "Professional Certification - Front-End Engineer",
            place: "FreeCodeCamp",
            color: "#EEF5FA",
            link: "https://www.freecodecamp.org/certification/renjith-kr/legacy-front-end"
        },
        {
            id: 1,
            date: "2003-2007",
            title: "Bachelor of Technology in Computer Science and Engineering",
            place: "University of Calicut - India",
            color: "#EEF5FA"
        },
      ]

      const experienceArray = [
        {
            id: 1,
            date: "July 2014 - PRESENT (5 Years 4 Months)",
            title: "System Architect",
            place: "Google (as vendor through HCL America)",
            location: "Mountain View",
            description: "Worked with Google's internal tools development team. Joined as a Technical Lead and got promoted as Senior Technical Lead in Oct 2015 and later promoted to Technical Architect in June 2017. In July 2018, I moved to Google Mountain view location from Google Hyderabad.",
            color: "#EEF5FA"
        },
        {
            id: 2,
            date: "Nov 2010 - June 2014 (3 Years 8 Months)",
            title: "Senior Interactive Developer L1",
            place: "Target (as Vendor through Sapient Consulting Pvt Ltd)",
            location: "Bangalore",
            description: "I was working at Target corporate from Nov 2010 to June 2014 and was part of core target.com development team. In Nov 2010, I started as an Interactive Developer L2 in June 2011. Later In June 2013, I was promoted to Senior Interactive Developer L1.",
            color: "#EEF5FA"
        },
        {
            id: 3,
            date: "June 2009 - Sept 2010 (1 Year 3 Months)",
            title: "UI Developer",
            place: "Ahsan Consulting Pvt Ltd",
            location: "Chennai",
            description: "I was part of the core social networking product development team and one of the individual contributors for most of the product developments.",
            color: "#EEF5FA"
        },
        {
            id: 4,
            date: "June 2008 - May 2009 (1 Year)",
            title: "Web Developer",
            place: "VirtualMaze Pvt Ltd",
            location: "Chennai",
            description: "I was a Web Developer leading projects independently. I owned the design, development and deployment of end to end projects, which included database design.",
            color: "#EEF5FA"
        },
        {
            id: 5,
            date: "June 2007 - May 2008 (1 Year)",
            title: "Web Developer",
            place: "ProconIT Solutions",
            location: "Chennai",
            description: "I was a Web Developer working with other engineers. I learned and improved my skills in design, development and deployment of end to end projects.",
            color: "#EEF5FA"
        }
      ]

      const contactArray = [
        {
            id: 1,
            title: "Phone ",
            item1: "+1(812) 361-8052",
            item2: "+1(812) 361-8052",
            bg: "#FCF4FF"
        },
        {
            id: 2,
            title: "Email ",
            item1: "ca.garcia2011@gmail.com",
            item2: "ca.garcia2011@gmail.com",
            bg: "#FCF4FF",
            bgDark: "accent-color"
        },
        {
            id: 3,
            title: "Address ",
            item1: "Bloomington, Indiana, US",
            item2: "Bloomington, Indiana, US",
            bg: "#FCF4FF",
            bgDark: "accent-color"
        },
      ]

  return {
    local,
    check,
    handleTheme,
    menuItems,
    educationArray,
    experienceArray,
    contactArray,
    avatars,
    handleImageChange,
    currentImgSelection,
    privacyPolicyIsOpen,
    setPrivacyPolicyIsOpen
  }
}