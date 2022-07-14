
import React, {createContext, useState} from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { useRouter } from 'next/router'
import gsap from "gsap";

export const PodcastContext = createContext();


export function PodcastContextProvider({lastPodcast, children}) {

    const [currentPodcast, setCurrentPodcast] = useState(lastPodcast);


    return (
        <PodcastContext.Provider value={{
            currentPodcast,
            setCurrentPodcast
            }}>
            {children}
        </PodcastContext.Provider>
    )
}