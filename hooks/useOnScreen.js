import { useEffect, useState } from 'react';

export const useOnScreen = (ref) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const [observer, setObserver] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let observerRes = new IntersectionObserver(([entry]) => {
      setCount((count) => count + 1);
      setIntersecting(entry.isIntersecting);
    });
    setObserver(observerRes);
  }, []);

  useEffect(() => {
    if (observer) {
      observer.observe(ref.current);
    }

    return () => {
      observer && observer.disconnect();
    };
  }, [observer]);

  return [isIntersecting, count];
};
