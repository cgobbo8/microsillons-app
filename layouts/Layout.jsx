import { useEffect } from 'react';
import { useContext } from 'react';
import { Navbar } from '../components/common/Navbar';
import { Sidebar } from '../components/common/Sidebar';
import { TransitionContext } from '../contexts/TransitionContext';
import styles from './Layout.module.scss';
import { joinStyles } from '../utils';
import { useState } from 'react';
import gsap from 'gsap';


export const Layout = ({ children, live }) => {
    
    const { loading, isBack, setIsBack } = useContext(TransitionContext);
    const [transitionOk, setTransitionOk] = useState(false);


    const tl = gsap.timeline({paused : true});

    useEffect(() => {

        gsap.set(".layout__content__transition", {
            opacity: 1,
            y: 1000,
            scale: 0.9,
            ease: "power2.inOut",
        });
    
        tl.to(".layout__content__transition", {
            duration: 0.7,
            opacity: 1,
            y: 0,
            scale : 1,
            ease: "power2.inOut",
        });

        setTransitionOk(true);
    });

    useEffect(() => {
        tl.play();
        setTransitionOk(false);
    }, [transitionOk]);

    return (
        <div id='root' className={styles.layout}>
            <div className={styles.layout__container}>
                <Navbar />
                
                <Sidebar live={live} className={styles.sidebar} />
                <main  className={`${joinStyles(styles.content, 'layout__content__transition')} ${transitionOk ? '' : 'hide'}`} >
                    {children}
                </main>
            </div>
            {
                loading &&
                    <div className="loader">

                    </div>
            }
            
        </div>
    );
}

  