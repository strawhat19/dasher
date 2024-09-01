'use client';

import { States } from '../../enums';
import { Atlanta } from '../../database';
import Logo from './components/logo/logo';
import { createContext, useState } from 'react';

export const GlobalDataContext = createContext({});

export default function GlobalData({ children }: { children: React.ReactNode; }) {
    let [user, setUser] = useState(null);
    let [darkMode, setDarkMode] = useState(true);
    let [pageTitle, setPageTitle] = useState(<Logo />);
    let [location, setLocation] = useState<any>(Atlanta);
    let [isSidebarOpen, setSidebarOpen] = useState(true);
    let [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    let [geoDataState, setGeoDataState] = useState<any>(States.Ready);
    let [time, setTime] = useState(`Sunday, September 1st, 5:33:06 am`);

    return <>
        <GlobalDataContext.Provider value={{
            user, setUser, 
            time, setTime,
            location, setLocation,
            darkMode, setDarkMode, 
            pageTitle, setPageTitle, 
            geoDataState, setGeoDataState,
            isSidebarOpen, setSidebarOpen, 
            isMobileSidebarOpen, setMobileSidebarOpen, 
        }}>
            {children}
        </GlobalDataContext.Provider>
    </>
}