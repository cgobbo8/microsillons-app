import styles from './Navbar.module.scss';
import logo from '../../../public/logo.png'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'

export const Navbar = ({openPlanning, openContact}) => {
    const router = useRouter()


    const handleNavigate = (e, route = "/") => {
        e.preventDefault()
        e.stopPropagation()
        // router.push(route)
    }
    
    return (
        <div className={styles.header}>
            
            <div className={styles.header__logo}>
                <Image src={logo} alt="logo" />
            </div>
            <div className={styles.header__nav}>
                <ul className={styles.header__nav__links}>
                    <li onClick={(e) => handleNavigate(e, "/")}  className={`nav_link ${styles.header__nav__link} ${router.route == '/' ? 'active' : ''}`}>
                        <Link  href="/">Accueil</Link>
                    </li>
                    {/* <li className={styles.header__nav__link}>
                        <Link href="https://soundcloud.com/micro-sillons"><a target='_blank' rel="noreferrer">Podcasts</a></Link>
                    </li> */}
                    <li onClick={(e) => handleNavigate(e, "/podcasts")} className={`nav_link ${styles.header__nav__link} ${router.route.includes('/podcasts') ? 'active' : ''}`}>
                        <Link href="/podcasts">Podcasts</Link>
                    </li>
                    <li onClick={(e) => handleNavigate(e, "/blog")} className={`nav_link ${styles.header__nav__link} ${router.route.includes('/blog') ? 'active' : ''}`}>
                        <Link href="/blog">Blog</Link>
                    </li>
                    <li style={{cursor : 'pointer'}} onClick={openContact} className={styles.header__nav__link}>
                        Contact
                    </li>
                </ul>
                <div className={styles.header__nav__widget}>
                    <button className={styles['header__nav__widget--button']} onClick={() => openPlanning()}>Planning</button>
                </div>
            </div>

            
        </div>
    )
}