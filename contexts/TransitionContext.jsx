
import React, {createContext, useState} from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { useRouter } from 'next/router'
import gsap from "gsap";

export const TransitionContext = createContext();





export function TransitionContextProvider({children}) {

    const [loading, isLoading] = useState(false);
    const [currentRoute, setCurrentRoute] = useState(null);
    const [isBack, setIsBack] = useState(false);
    const router = useRouter();

    const transitionTo = (path, route) => {

        const tl = gsap.timeline();

        setCurrentRoute(route);

        tl.to(".layout__content__transition", {
            duration: 0.7,
            y: '120vh',
            scale : 1.1,
            ease: "power2.inOut",
            onComplete: () => {
                router.push(path);
            }
        });

    };

    const backTo = () => {

        const tl = gsap.timeline();
        setIsBack(true);

        tl.to(".article__container", {
            duration: 0.7,
            y: '120vh',
            scale : 1.1,
            ease: "power2.inOut",
            onComplete: () => {
                if (currentRoute) {
                    router.push(currentRoute);
                } else {
                    router.push('/');
                }
            }
        });

    };


    const reinitTransition = () => {

        const tl = gsap.timeline();

        tl.to(".layout__content__transition", {
            duration: 0.7,
            y: '0',
            scale : 1,
            ease: "power2.inOut",
        });

    };



    return (
        <TransitionContext.Provider value={{
            loading,
            isLoading,
            transitionTo,
            reinitTransition,
            backTo,
            isBack,
            setIsBack
            }}>
            {children}
        </TransitionContext.Provider>
    )
}