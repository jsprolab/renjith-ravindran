import { useState, useEffect, ReactNode, useCallback } from "react"

import { Link, useLocation } from "react-router-dom"

import { FaRegUser } from "react-icons/fa"
import { CgNotes } from "react-icons/cg"
import { RiContactsBookLine } from "react-icons/ri"
import { MdOutlineMenuBook, MdOutlineBusinessCenter } from "react-icons/md"
import { AiOutlineFilePdf } from "react-icons/ai"

import avatarIdea from '../assets/about/renjith-profile.jpeg'
import avatarCoding from '../assets/about/renjith-profile.jpeg'
import avatarFist from '../assets/about/renjith-profile.jpeg'
import avatarSuccess from '../assets/about/renjith-profile.jpeg'
import avatarGreatness from '../assets/about/renjith-profile.jpeg'

export type DataReturnType = ReturnType<typeof data>

export const data = () => {
    const [check, setCheck] = useState(false)
    const [local, setLocal] = useState(typeof window !== 'undefined' ? localStorage.getItem("theme") : null)
    const [currentImgSelection, setCurrentImgSelection] = useState(avatarIdea)
    const [privacyPolicyIsOpen, setPrivacyPolicyIsOpen] = useState(false)

    useEffect(() => {
        if (typeof window === 'undefined') return; // Skip on server-side
        
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
        if (typeof window === 'undefined') return; // Skip on server-side
        
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
        {
          id: "03",
          name: "Experience",
          link: "/experience",
          icon: <MdOutlineBusinessCenter />,
        },
        {
          id: "08",
          name: "Resume",
          link: "/resume",
          icon: <AiOutlineFilePdf />,
        },
        {
          id: "06",
          name: "Publications",
          link: "/publications",
          icon: <MdOutlineMenuBook />,
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
            id: 1,
            date: "2003 – 2007",
            title: "Bachelor of Technology (B.Tech.) — Computer Science & Engineering",
            place: "Government Engineering College Sreekrishnapuram | University of Calicut, Kerala, India",
            color: "#EEF5FA"
        },
        {
            id: 2,
            date: "2016 – 2017",
            title: "Front End Development Certification",
            place: "freeCodeCamp",
            color: "#EEF5FA",
            link: "https://www.freecodecamp.org/certification/renjith-kr/legacy-front-end"
        },
        {
            id: 3,
            date: "2022 – 2023",
            title: "AI in Healthcare Specialization (5 Courses)",
            place: "Stanford University / Coursera",
            color: "#EEF5FA"
        },
      ]

      const experienceArray = [
        {
            id: 1,
            date: "Apr 2020 – Present",
            title: "Senior Software Engineer III — Front-End Architect",
            place: "Castlight Health, Inc.",
            location: "San Francisco Bay Area, CA",
            description: "Lead front-end architecture for enterprise digital-health platforms. Architected Curelight — a national vaccine-finder integrated with CDC Vaccines.gov — reaching 100M+ users since 2021. Built secure identity, scheduling, and personalization systems improving reliability by 45%+.",
            color: "#EEF5FA"
        },
        {
            id: 2,
            date: "Jul 2014 – Apr 2020",
            title: "Technical Architect → System Architect",
            place: "Google (Vendor through HCL Technologies Ltd.)",
            location: "Mountain View, CA & Hyderabad, India",
            description: "Headed 8-member front-end team across Google My Business, Google Maps, Stadia, Chromecast, and gTech Ads. Built the Google Maps 'Follow' button and social-commerce layer. Served as Certified Google JavaScript Code Reviewer. Awards: HCL MVP (2017), HCL Innovation (2016), Google Best Team Player (2015).",
            color: "#EEF5FA"
        },
        {
            id: 3,
            date: "Nov 2010 – Jun 2014",
            title: "Senior Interactive Developer L1",
            place: "Target (Vendor through Publicis Sapient Consulting Pvt. Ltd.)",
            location: "Bangalore, India",
            description: "Led front-end engineering for Target's $1.8B Everest Redesign — migrating Target.com from Amazon-hosted infrastructure. Primary implementer of cart, checkout, and guest account modules serving millions of shoppers. Awards: Sapient Core-Value Award x3, Target Great Team Card.",
            color: "#EEF5FA"
        },
        {
            id: 4,
            date: "Jun 2009 – Sep 2010",
            title: "UI Lead / Web Developer",
            place: "Ashan Consulting Pvt. Ltd.",
            location: "Chennai, India",
            description: "Led a team delivering consumer and social-community platforms: GroupDeal, Isocial, Discuz, Channel, Rayzz, and Volume.",
            color: "#EEF5FA"
        },
        {
            id: 5,
            date: "Jun 2007 – May 2009",
            title: "Web Developer",
            place: "VirtualMaze Softsys Pvt. Ltd.",
            location: "Chennai, India",
            description: "Developed and maintained company web properties end-to-end using PHP, MySQL, HTML, CSS, and JavaScript.",
            color: "#EEF5FA"
        },
      ]

      const contactArray = [
        {
            id: 1,
            title: "Phone",
            item1: "+1 332-201-2312",
            item2: "+1 332-201-2312",
            bg: "#FCF4FF"
        },
        {
            id: 2,
            title: "Email",
            item1: "renjith.wky@gmail.com",
            item2: "renjith.wky@gmail.com",
            bg: "#FCF4FF",
            bgDark: "accent-color"
        },
        {
            id: 3,
            title: "Address",
            item1: "Fremont, CA",
            item2: "Fremont, CA",
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