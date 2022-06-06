
import React, {createContext, useState} from "react";
import { useReducer } from "react";
import { useEffect } from "react";


export const TransitionContext = createContext();





export function TransitionContextProvider({children}) {

    const [loading, isLoading] = useState(false);


    return (
        <TransitionContext.Provider value={{
            loading,
            isLoading
            }}>
            {children}
        </TransitionContext.Provider>
    )
}