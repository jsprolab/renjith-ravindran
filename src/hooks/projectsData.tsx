import { AppleConceptDesign, BrokerAutoPage, CgNetflixClone } from "../assets/projects"
import { FaReact } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiMongodb, SiNextdotjs } from "react-icons/si";

export type ProjectsDataReturnType = ReturnType<typeof projectsData>

export function projectsData() {
    // Define tech stack icons directly to avoid circular dependency
    const techStack = {
        react: { id: 1, Icon: FaReact, tooltip: "React", animation: "animate-spin-slow", color: "#5ed3f2" },
        typescript: { id: 3, Icon: SiTypescript, tooltip: "TypeScript", animation: null, color: "#3074bf" },
        tailwind: { id: 6, Icon: SiTailwindcss, tooltip: "Tailwind CSS", animation: null, color: "#37bcf7" },
        mongoDB: { id: 9, Icon: SiMongodb, tooltip: "MongoDB", animation: null, color: "#3AB84D" },
        nextjs: { id: 13, Icon: SiNextdotjs, tooltip: "Next.js", animation: null, color: "#000" }
    }

    const projectsArray = [
        {
            id: 3,
            title: "Netflix Clone",
            description: "Fullstack Netflix Clone built with Next.js, NextAuth.js, and MongoDB. This project was deployed with Vercel.",
            pageLink: "https://cg-netflix-clone.vercel.app/",
            codeLink: "https://github.com/cagarcia2011/cg-netflix-clone",
            image: CgNetflixClone,
            icons: [
                techStack.nextjs,
                techStack.typescript,
                techStack.mongoDB
            ]
        },
        {
            id: 1,
            title: "BrokerAuto Webpage",
            description: "BrokerAuto Company Webpage that features a virtual advisor that assists customers that are looking to buy a car. This a project is in Beta. This project was deployed with Netlify.",
            pageLink: "https://test-brokerauto.netlify.app/",
            codeLink: "",
            image: BrokerAutoPage,
            icons: [
                techStack.react,
                techStack.typescript,
                techStack.tailwind
            ]
        },
        {
            id: 2,
            title: "Apple Store Concept UI Design",
            description: "Concept design for an Apple product landing page. This project showcases my UI design and Front-End skills to create a beautiful, responsive and interactive Webpage. This project was deployed with Netlify.",
            pageLink: "https://apple-concept.netlify.app/",
            codeLink: "https://github.com/cagarcia2011/apple-landing-page-concept#apple-concept-landing-page",
            image: AppleConceptDesign,
            icons: [
                techStack.react,
                techStack.typescript,
                techStack.tailwind
            ]
        },
    ]

    return {
        projectsArray
    }
}