import { useContext } from "react";

import { Context } from "../context/ContextProvider";

export const useData = () => {
    const context = useContext(Context);
    
    if (!context) {
        throw new Error('useData must be used within a ContextProvider');
    }
    
    return context;
}