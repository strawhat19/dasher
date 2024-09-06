'use client';

import Logo from '../components/logo/logo';
import { Atlanta } from './database/database';
import { States } from './library/common/enums';
import { createContext, useState } from 'react';

export const SharedDatabase = createContext({});

export default function SharedData({ children }: { children: React.ReactNode; }) {
    let [user, setUser] = useState(null);
    let [darkMode, setDarkMode] = useState(true);
    let [pageTitle, setPageTitle] = useState(<Logo />);
    let [location, setLocation] = useState<any>(Atlanta);
    let [isSidebarOpen, setSidebarOpen] = useState(true);
    let [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    let [geoDataState, setGeoDataState] = useState<any>(States.Ready);
    let [time, setTime] = useState(`Sunday, September 1st, 5:33:06 am`);

    return <>
        <SharedDatabase.Provider value={{
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
        </SharedDatabase.Provider>
    </>
}