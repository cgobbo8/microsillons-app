import styles from './Navbar.module.scss';
import logo from '../../../public/logo.png'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'

export const Navbar = () => {
    const router = useRouter()
    console.log(router.route);

    const handleNavigate = (e, route = "/") => {
        e.preventDefault()
        e.stopPropagation()
        console.log(route);
        // router.push(route)
    }
    
    return (
        <div className={styles.header}>
            <div className={styles.header__logo}>
                <Image src={logo} alt="logo" />
            </div>
            <div className={styles.header__nav}>
                <ul className={styles.header__nav__links}>
                    <li  className={`nav_link ${styles.header__nav__link} ${router.route == '/' ? 'active' : ''}`}>
                        <Link onClick={(e) => handleNavigate(e, "/")} href="/">Accueil</Link>
                    </li>
                    <li className={styles.header__nav__link}>
                        <Link href="https://soundcloud.com/micro-sillons"><a target='_blank' rel="noreferrer">Podcasts</a></Link>
                    </li>
                    <li onClick={(e) => handleNavigate(e, "/blog")} className={`nav_link ${styles.header__nav__link} ${router.route == '/blog' ? 'active' : ''}`}>
                        <Link href="/blog">Blog</Link>
                    </li>
                    <li className={styles.header__nav__link}>
                        Contact
                    </li>
                </ul>
                <div className={styles.header__nav__widget}>
                    <div>Planning</div>
                </div>
            </div>

            
        </div>
    )
}