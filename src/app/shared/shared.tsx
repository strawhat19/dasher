'use client';

import app, { db } from '@/server/firebase';
import Logo from '../components/logo/logo';
import { Atlanta } from './database/database';
import { States } from './library/common/enums';
import { createContext, useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';

export const SharedDatabase = createContext({});

export default function SharedData({ children }: { children: React.ReactNode; }) {
    let [user, setUser] = useState(null);
    let [cards, setCards] = useState<any>([]);
    let [darkMode, setDarkMode] = useState(true);
    let [pageTitle, setPageTitle] = useState(<Logo />);
    let [location, setLocation] = useState<any>(Atlanta);
    let [isSidebarOpen, setSidebarOpen] = useState(true);
    let [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    let [geoDataState, setGeoDataState] = useState<any>(States.Ready);
    let [time, setTime] = useState(`Sunday, September 1st, 5:33:06 am`);

    useEffect(() => {
        const cardsCollection = collection(db, `cards`);
        const unsubscribeFromCardsDatabase = onSnapshot(cardsCollection, (currentCardsInDB) => {
            const cardsFromDB: any[] = [];
            currentCardsInDB.forEach((doc) => cardsFromDB.push(doc.data()));
            setCards(cardsFromDB);
          });
    
          return () => {
            unsubscribeFromCardsDatabase();
          };
    }, [])

    return <>
        <SharedDatabase.Provider value={{
            user, setUser, 
            time, setTime,
            cards, setCards,
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