import { useEffect, useState } from "react"

export const useOnScreen = (ref) => {

    const [isIntersecting, setIntersecting] = useState(false)
    const [observer, setObserver] = useState(null)
    
    useEffect(() => {
        
        let observerRes = new IntersectionObserver(
            ([entry]) => setIntersecting(entry.isIntersecting)
        )

        setObserver(observerRes);

    }, [])
    
    useEffect(() => {
        if (observer) {
            observer.observe(ref.current)
        }

        return () => { observer && observer.disconnect() }

    }, [observer])
  
    return isIntersecting
  }