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
            

            <div className={styles.layout__container}>
                <Navbar openPlanning={openPlanning} openContact={openContact} />
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
            <div className={`${styles.blur_overlay} ${contactOpen ? styles['blur_overlay--open'] : styles['blur_overlay--close']}`} >
                <div className={`${styles.contact} ${contactOpen ? styles['contact--open'] : styles['contact--close']}`} >
                    <div className={styles.contact__close} >
                        <CloseButton onClick={closeContact} />
                    </div>
                    <div className={styles.contact__map}>
                        <div className={styles['contact__map--embed']} dangerouslySetInnerHTML={{ __html: global.attributes.contact.adresse_google_map }}>
                            {/* <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9712.683838964076!2d1.4631214335537523!3d43.63572149049223!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xeff97bbf79e393a0!2sMicro%20Sillons!5e0!3m2!1sfr!2sfr!4v1655027247134!5m2!1sfr!2sfr" width="400" height="300" style={{border: "0"}} allowFullScreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
                        </div>
                        {/* <div className={styles['contact__map__body']}>
                            <div className={styles['contact__map__body--address']}>
                                <span>{global.attributes.contact.adresse_1}</span>
                                { global.attributes.contact.adresse_2 && <span>{global.attributes.contact.adresse_2}</span>}
                                <span>{global.attributes.contact.code_postal} {global.attributes.contact.ville}</span>
                            </div>
                            <div className={styles['contact__map__body--social']}>
                                { global.attributes.reseaux.facebook && <Link href={global.attributes.reseaux.facebook} ><a href={global.attributes.reseaux.facebook}><SocialIcon url={global.attributes.reseaux.facebook} /></a></Link>}
                                { global.attributes.reseaux.youtube && <Link href={global.attributes.reseaux.youtube} ><a href={global.attributes.reseaux.youtube}><SocialIcon url={global.attributes.reseaux.youtube} /></a></Link>}
                                { global.attributes.reseaux.discord && <Link href={global.attributes.reseaux.discord} ><a href={global.attributes.reseaux.discord}><SocialIcon url={global.attributes.reseaux.discord} /></a></Link>}
                                { global.attributes.reseaux.twitter && <Link href={global.attributes.reseaux.twitter} ><a href={global.attributes.reseaux.twitter}><SocialIcon url={global.attributes.reseaux.twitter} /></a></Link>}
                                { global.attributes.reseaux.instagram && <Link href={global.attributes.reseaux.instagram} ><a href={global.attributes.reseaux.instagram}><SocialIcon url={global.attributes.reseaux.instagram} /></a></Link>}
                                { global.attributes.reseaux.mixlr && <Link href={global.attributes.reseaux.mixlr} ><a href={global.attributes.reseaux.mixlr}><SocialIcon url={global.attributes.reseaux.mixlr} /></a></Link>}
                                { global.attributes.reseaux.donation && <Link href={global.attributes.reseaux.donation} ><a href={global.attributes.reseaux.donation}><SocialIcon url={global.attributes.reseaux.donation} /></a></Link>}
                                { global.attributes.reseaux.soundcloud && <Link href={global.attributes.reseaux.soundcloud} ><a href={global.attributes.reseaux.soundcloud}><SocialIcon url={global.attributes.reseaux.soundcloud} /></a></Link>}
                            </div>
                        </div> */}

                    </div>
                    <div className={styles.contact__sponsors}>
                        <div className={styles['contact__sponsors--partenaires']}>
                            <h3>Merci à tous nos partenaires</h3>
                            <ul>
                                { global.attributes.financeurs.map((sponsor, index) => (
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
                </div>
            </div>
            
        </div>
    );
}

  