'use client';

import { db } from '@/server/firebase';
import Logo from '../components/logo/logo';
import { Atlanta } from './database/database';
import { createContext, useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { QuestionClass } from '../components/question/question';
import { Difficulties, States, Topics } from './library/common/enums';

export const SharedDatabase = createContext({});

export default function SharedData({ children }: { children: React.ReactNode; }) {
    let [user, setUser] = useState(null);
    let [cards, setCards] = useState<any>([]);
    let [darkMode, setDarkMode] = useState(true);
    let [pageTitle, setPageTitle] = useState(<Logo />);
    let [location, setLocation] = useState<any>(Atlanta);
    let [isSidebarOpen, setSidebarOpen] = useState(true);
    let [geoDataState, setGeoDataState] = useState<any>(States.Ready);
    let [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    let [time, setTime] = useState(`Sunday, September 1st, 5:33:06 am`);

    let [questions, setQuestions] = useState<QuestionClass[]>([
        new QuestionClass({
          answer: 4,
          choices: [3, 5, 4, 22],
          question: `What is 2 + 2?`,
          difficulty: Difficulties.Easy,
          explanation: `2 + 2 = 4 Because I Said So`,
          topics: Object.values(Topics).slice(0, 3),
        }),
        new QuestionClass({
          answer: 5,
          choices: [3, 5, 4, 22],
          question: `What is 3 + 2?`,
          difficulty: Difficulties.Medium,
          explanation: `3 + 2 = 5 Because I Said So`,
          topics: Object.values(Topics).slice(0, 3),
        }),
        new QuestionClass({
          answer: 22,
          choices: [3, 5, 4, 22],
          question: `What is 11 + 11?`,
          difficulty: Difficulties.Hard,
          explanation: `11 + 11 = 22 Because I Said So`,
          topics: Object.values(Topics).slice(0, 3),
        }),
        new QuestionClass({
          answer: 100,
          choices: [100, 5, 4, 22],
          question: `What is 10 x 10?`,
          difficulty: Difficulties.Hard,
          explanation: `10 x 10 = 100 Because I Said So`,
          topics: Object.values(Topics).slice(0, 3),
        }),
    ])

    useEffect(() => {
        const cardsCollection = collection(db, `cards`);
        const unsubscribeFromCardsDatabase = onSnapshot(cardsCollection, (currentCardsInDB) => {
            const cardsFromDB: any[] = [];
            currentCardsInDB.forEach((doc) => cardsFromDB.push(doc.data()));
            setCards(cardsFromDB);
        });
       
        // const questionsCollection = collection(db, `questions`);
        // const unsubscribeFromQuestionsDatabase = onSnapshot(questionsCollection, (currentquestionsInDB) => {
        //     const questionsFromDB: any[] = [];
        //     currentquestionsInDB.forEach((doc) => questionsFromDB.push(doc.data()));
        //     setQuestions(questionsFromDB);
        // });

        return () => {
            unsubscribeFromCardsDatabase();
            // unsubscribeFromQuestionsDatabase();
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
            questions, setQuestions,
            geoDataState, setGeoDataState,
            isSidebarOpen, setSidebarOpen, 
            isMobileSidebarOpen, setMobileSidebarOpen, 
        }}>
            {children}
        </SharedDatabase.Provider>
    </>
}