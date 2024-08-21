import { createContext } from "react";

export const GlobalDataContext = createContext({});

export default function DataShare({ children, value }: { children: React.ReactNode; value: any; }) {
    return (
        <GlobalDataContext.Provider value={value}>
            {children}
        </GlobalDataContext.Provider>
    )
}