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
        const myData = data();
        const myProjectsData = projectsData()
        const techStach = techStackData()
        const skills = skillsData()

        return (
            <Context.Provider value={{
                ...myData,
                ...myProjectsData,
                ...techStach,
                ...skills
            }}>
                {children}
            </Context.Provider>
        )
    } catch (error) {
        console.error('ContextProvider error:', error);
        // Return a more visible error for debugging
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