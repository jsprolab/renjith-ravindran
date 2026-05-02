import { AppleConceptDesign, BrokerAutoPage, CgNetflixClone } from "../assets/projects"
import { FaReact, FaPython } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiAngular, SiNodedotjs, SiGooglecloud } from "react-icons/si";

export type ProjectsDataReturnType = ReturnType<typeof projectsData>

export function projectsData() {
    const techStack = {
        react: { id: 1, Icon: FaReact, tooltip: "React", animation: "animate-spin-slow", color: "#5ed3f2" },
        typescript: { id: 3, Icon: SiTypescript, tooltip: "TypeScript", animation: null, color: "#3074bf" },
        nextjs: { id: 13, Icon: SiNextdotjs, tooltip: "Next.js", animation: null, color: "#000" },
        angular: { id: 8, Icon: SiAngular, tooltip: "Angular", animation: null, color: "#dd0031" },
        nodejs: { id: 11, Icon: SiNodedotjs, tooltip: "Node.js", animation: null, color: "#589450" },
        python: { id: 7, Icon: FaPython, tooltip: "Python", animation: null, color: "#3573a5" },
        gcp: { id: 14, Icon: SiGooglecloud, tooltip: "GCP", animation: null, color: "#4285F4" },
    }

    const projectsArray = [
        {
            id: 1,
            title: "Curelight — National Vaccine Finder",
            description: "Architected a national vaccine-finder and inventory platform integrated with CDC Vaccines.gov. Reached 100M+ visitors since Jan 2021, supporting the U.S. government's COVID-19 vaccination response across 50,000+ healthcare providers and 14 major pharmacy chains.",
            pageLink: "https://www.castlighthealth.com",
            codeLink: "",
            image: CgNetflixClone,
            icons: [
                techStack.react,
                techStack.typescript,
                techStack.nodejs,
                techStack.gcp,
            ]
        },
        {
            id: 2,
            title: "Google Maps — Follow Button & Social Commerce",
            description: "Designed and built the Google Maps 'Follow' button, following/followed counters, business-profile cards, and dynamic feed components — transforming Google Maps into a social-commerce discovery platform for millions of local businesses.",
            pageLink: "https://maps.google.com",
            codeLink: "",
            image: BrokerAutoPage,
            icons: [
                techStack.angular,
                techStack.typescript,
                techStack.python,
            ]
        },
        {
            id: 3,
            title: "Target.com — Everest Redesign ($1.8B)",
            description: "Led front-end engineering for Target's $1.8B Everest Redesign — migrating Target.com from Amazon-hosted infrastructure to Target's own platform. Primary implementer of guest account, cart, and checkout modules serving millions of shoppers.",
            pageLink: "https://www.target.com",
            codeLink: "",
            image: AppleConceptDesign,
            icons: [
                techStack.react,
                techStack.typescript,
                techStack.nodejs,
            ]
        },
    ]

    return {
        projectsArray
    }
}
