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
        return (
            <div style={{ padding: '20px', color: 'red' }}>
                <h2>Error loading application data</h2>
                <p>Please refresh the page or contact support.</p>
                <details>
                    <summary>Error details</summary>
                    <pre>{error instanceof Error ? error.message : String(error)}</pre>
                </details>
            </div>
        );
    }
}