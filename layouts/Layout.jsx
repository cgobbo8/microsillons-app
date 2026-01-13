import { cloneElement, useCallback, useEffect } from 'react';
import { useContext } from 'react';
import { Navbar } from '../components/common/Navbar';
import { Sidebar } from '../components/common/Sidebar';
import { TransitionContext } from '../contexts/TransitionContext';
import styles from './Layout.module.scss';
import { joinStyles } from '../utils';
import { useState } from 'react';
import gsap from 'gsap';
import ImagePerso from '../components/bloc/image';
import { SocialIcon } from 'react-social-icons';
import Link from 'next/link';
import { CloseButton } from '../components/common/CloseButton';
import { slide as Menu } from 'react-burger-menu'
import Script from 'next/script';


export const Layout = ({ children, live, planning, global }) => {
    
    const { loading, preventLayoutTransition, isBack, setIsBack } = useContext(TransitionContext);
    const [transitionOk, setTransitionOk] = useState(false);
    const [planningOpen, setPlanningOpen] = useState(false);
    const [contactOpen, setContactOpen] = useState(false);

    
    const tl = gsap.timeline({paused : true});
    
    useEffect(() => {
        setTransitionOk(false)

        if (!preventLayoutTransition) {
            tl.set(".layout__content__transition", {
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

        }
        
    }), [preventLayoutTransition];

    useEffect(() => {
        tl.play();
        setTransitionOk(false);
    }, [preventLayoutTransition]);

    const openPlanning = useCallback(() => {
        if (!planning?.attributes?.planning?.data?.attributes) return;
        if (planning.attributes.planning.data.attributes.ext === '.pdf') {
            window.open(planning.attributes.planning.data.attributes.url, '_blank');
        } else {
            setPlanningOpen(true);
        }
    }, [setPlanningOpen, planning]);

    const closePlanning = useCallback(() => {
        setPlanningOpen(false);
    }, [setPlanningOpen]);

    const stopPropagation = useCallback(e => {
        e.stopPropagation();
        e.preventDefault();
    },[]);

    const openContact = useCallback(() => {
        setContactOpen(true);
    },[setContactOpen]);

    const closeContact = useCallback(() => {
        setContactOpen(false);
    },[setContactOpen])


    return (
        <div id='root' className={styles.layout}>
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-X3B442098Y');
                `}
            </Script>

            <div className={styles.layout__container}>
                <Navbar openPlanning={openPlanning} openContact={openContact} hasPlanning={!!planning?.attributes?.planning?.data} />
                <span className={styles.hamb_menu}>
                    <Menu elastic>
                        <a id="home" className="menu-item" href="/">Accueil</a>
                        <a id="about" className="menu-item" href="/podcasts">Podcasts</a>
                        <a id="contact" className="menu-item" href="/blog">Blog</a>
                    </Menu>
                </span>
                
                <Sidebar live={live} className={styles.sidebar} />
                <main  className={`${joinStyles(styles.content, 'layout__content__transition')} ${transitionOk ? '' : 'hide'}`} >
                {
                    cloneElement(children, {
                        openContact: openContact
                    })
                }
                </main>
            </div>

            {planning?.attributes?.planning?.data?.attributes?.url && (
            <div onClick={closePlanning}  className={`${styles.blur_overlay} ${planningOpen ? styles['blur_overlay--open'] : styles['blur_overlay--close']}`} >
                        <div  className={styles.planning__close} >
                            <CloseButton onClick={closePlanning} />
                        </div>

                    <span style={{position : 'absolute', top : 0, left : 0,width : '100%'}}>
                    <span className={`${styles['blur_overlay--planning']} ${planningOpen ? styles['blur_overlay--planning--open'] : styles['blur_overlay--planning--close']}`}>

                        <img className={styles['blur_overlay--planning--image']} src={planning.attributes.planning.data.attributes.url} />
                        </span>
                    </span>


            </div>
            )}
            <div className={`${styles.blur_overlay} ${contactOpen ? styles['blur_overlay--open'] : styles['blur_overlay--close']}`} >
                <div className={`${styles.contact} ${contactOpen ? styles['contact--open'] : styles['contact--close']}`} >
                    <div className={styles.contact__close} >
                        <CloseButton onClick={closeContact} />
                    </div>
                    {global?.attributes?.contact && (
                    <div className={styles.contact__map}>
                        <div className={styles['contact__map--embed']} dangerouslySetInnerHTML={{ __html: global.attributes.contact.adresse_google_map || '' }}>
                        </div>
                        <div className={styles['contact__map__body']}>
                            <div className={styles['contact__map__body--address']}>
                                <span>{global.attributes.contact.adresse_1}</span>
                                { global.attributes.contact.adresse_2 && <span>{global.attributes.contact.adresse_2}</span>}
                                <span>{global.attributes.contact.code_postal} {global.attributes.contact.ville}</span>
                            </div>
                            <div className={styles['contact__map__body--social']}>
                                { global.attributes.reseaux?.facebook && <SocialIcon target='_blank' rel="noreferrer" url={global.attributes.reseaux.facebook} />}
                                { global.attributes.reseaux?.youtube && <SocialIcon target='_blank' rel="noreferrer" url={global.attributes.reseaux.youtube} />}
                                { global.attributes.reseaux?.discord && <SocialIcon target='_blank' rel="noreferrer" url={global.attributes.reseaux.discord} />}
                                { global.attributes.reseaux?.twitter && <SocialIcon target='_blank' rel="noreferrer" url={global.attributes.reseaux.twitter} />}
                                { global.attributes.reseaux?.instagram && <SocialIcon target='_blank' rel="noreferrer" url={global.attributes.reseaux.instagram} />}
                                { global.attributes.reseaux?.mixlr && <SocialIcon target='_blank' rel="noreferrer" url={global.attributes.reseaux.mixlr} />}
                                { global.attributes.reseaux?.donation && <SocialIcon target='_blank' rel="noreferrer" url={global.attributes.reseaux.donation} />}
                                { global.attributes.reseaux?.soundcloud && <SocialIcon target='_blank' rel="noreferrer" url={global.attributes.reseaux.soundcloud} />}
                            </div>
                        </div>

                    </div>
                    )}
                    <div className={styles.contact__sponsors}>
                        <div className={styles['contact__sponsors--partenaires']}>
                            <h3>Merci à tous nos partenaires</h3>
                            <ul>
                                { global?.attributes?.financeurs?.map((sponsor, index) => (
                                    <li className={styles['contact__sponsors--partenaire']} key={index}>
                                        <Link href={sponsor.url} target="_blank" ><a href={sponsor.url} target="_blank" rel="noreferrer">{sponsor.financeur}</a></Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles['contact__sponsors--dev']}>
                            Site conçu par <a href="https://www.linkedin.com/in/corentin-gobbo-667b02187/" className="accent">Corentin Gobbo</a>
                        </div>
                    </div>
                    {global?.attributes?.contact && (
                    <>
                    <div className={styles.contact__telephone}>
                        <a className="link" href={`tel:${global.attributes.contact.telephone}`}>
                            {global.attributes.contact.telephone}
                        </a>
                    </div>
                    <div  className={styles.contact__mail}>
                    <a className="link"  href={`mailto:${global.attributes.contact.email}`}>
                            {global.attributes.contact.email}
                        </a>
                    </div>
                    </>
                    )}
                </div>
            </div>
            
        </div>
    );
}

  