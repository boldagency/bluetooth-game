'use client';

import { db, startRace, timeUp } from '@/lib/Fire';
import { doc, onSnapshot } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';

const RaceContext = createContext();
export const GameState = {
    Start: 0,
    Waiting: 1,
    Warmup: 1,
    Race: 2,
    Finish: 3
}
export function useAppContext() {
    return useContext(RaceContext);
}

export function SetRaceContext({ data }) {
    const appContext = useAppContext();

    if (data?.headerTheme) {
        appContext.setHeaderTheme(data.headerTheme);
    }
    appContext.setIsLoaderShown(appContext.isLoaderShown);
    return <></>
}

export default function RaceProvider({ children }) {
    const [state, setState] = useState(GameState.Start);
    const [startTime, setStartTime] = useState(null);
    const [p1Distance, setP1Distance] = useState(0);
    const [p2Distance, setP2Distance] = useState(0);
    const [winner, setWinner] = useState(undefined);
    const gameDuration = 60000; // 1 minute in milliseconds

    useEffect(() => {
        // socket.on('story', onPedal);
        // resetRace();
        onSnapshot(doc(db, "race", "Vdj9u6L1WiOPA8nwLmxW"), (doc) => {
            const rec = doc.data();
            setState(rec.state);
            console.log(rec.p1)
            setP1Distance(rec.p1);
            setP2Distance(rec.p2);

            if (rec.state === GameState.Warmup) {
                // WAit 10 seconds as warmup
                setTimeout(() => {
                    //Transitioning to race state
                    startRace();
                    startTimer();
                }, 10000);
            } else if (rec.state === GameState.Race) {
                setP1Distance(parseInt(rec.p1))
                setP2Distance(parseInt(rec.p2))
            }
        });

        const startTimer = () => {
            setTimeout(() => {
                // Game timer ended..... check if still no winner
                if (state !== GameState.Finish) {
                    setState(GameState.Finish);
                    timeUp();
                }

            }, gameDuration);
        };

        return () => {
            // socket.off('story', clean);
        };
    }, [])


    return (
        <RaceContext.Provider value={{
            state, setState,
            startTime, setStartTime,
            p1Distance, setP1Distance,
            p2Distance, setP2Distance
        }}>
            {children}
        </RaceContext.Provider>

    );
}