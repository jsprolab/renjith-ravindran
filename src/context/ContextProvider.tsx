import { createContext } from "react";
import {
    DataReturnType,
    data, 
    ProjectsDataReturnType, 
    projectsData, 
    techStackData, 
    TechStackDataReturnType,
    skillsData,
    SkillsDataReturnType
} from "../hooks/";

export interface DataContextType extends DataReturnType, ProjectsDataReturnType, TechStackDataReturnType, SkillsDataReturnType { }

export const Context = createContext<DataContextType | null>(null);

type ContextProviderProps = {
    children: JSX.Element | JSX.Element[]
}

export const ContextProvider = ({ children }: ContextProviderProps) => {
    try {
        // Test with minimal data first
        const myData = data();
        
        return (
            <Context.Provider value={{
                ...myData,
                // Temporarily provide empty objects for other data
                projectsArray: [],
                techStack: {
                    javascript: { id: 12, Icon: null, tooltip: "JavaScript", animation: null, color: "#efd819", showOnBanner: true },
                    react: { id: 1, Icon: null, tooltip: "React", animation: "animate-spin-slow", color: "#5ed3f2", showOnBanner: true },
                    nextjs: { id: 13, Icon: null, tooltip: "Next.js", animation: null, color: "#000", showOnBanner: false },
                    redux: { id: 2, Icon: null, tooltip: "Redux", animation: "animate-spin-slow", color: "#7347b6", showOnBanner: true },
                    typescript: { id: 3, Icon: null, tooltip: "TypeScript", animation: null, color: "#3074bf", showOnBanner: true },
                    html: { id: 4, Icon: null, tooltip: "HTML", animation: null, color: "#dd4b25", showOnBanner: true },
                    css: { id: 5, Icon: null, tooltip: "CSS", animation: null, color: "#254bdd", showOnBanner: true },
                    tailwind: { id: 6, Icon: null, tooltip: "Tailwind CSS", animation: null, color: "#37bcf7", showOnBanner: true },
                    python: { id: 7, Icon: null, tooltip: "Python", animation: "animate-spin-slow", color: "#3573a5", showOnBanner: true },
                    angular: { id: 8, Icon: null, tooltip: "Angular", animation: null, color: "#dd0031", showOnBanner: true },
                    mongoDB: { id: 9, Icon: null, tooltip: "MongoDB", animation: null, color: "#3AB84D", showOnBanner: true },
                    postgreSQL: { id: 10, Icon: null, tooltip: "PostgreSQL", animation: null, color: "#336791", showOnBanner: true },
                    nodeJS: { id: 11, Icon: null, tooltip: "Node.JS", animation: null, color: "#589450", showOnBanner: true }
                },
                advanceSkills: [],
                familiarSkills: [],
                tools: []
            }}>
                {children}
            </Context.Provider>
        )
    } catch (error) {
        console.error('ContextProvider error:', error);
        return (
            <div style={{ 
                padding: '20px', 
                color: 'red', 
                backgroundColor: 'yellow',
                border: '2px solid red',
                fontSize: '16px',
                position: 'fixed',
                top: '0',
                left: '0',
                right: '0',
                zIndex: '9999'
            }}>
                <h2>ERROR: ContextProvider failed to load</h2>
                <p>Error: {error instanceof Error ? error.message : String(error)}</p>
                <p>Stack: {error instanceof Error ? error.stack : 'No stack trace'}</p>
            </div>
        );
    }
}