import styles from './Navbar.module.scss';
import logo from '../../../public/logo.png'
import Image from 'next/image';
import Link from 'next/link';

export const Navbar = () => {
    return (
        <div className={styles.header}>
            <div className={styles.header__logo}>
                <Image src={logo} alt="logo" />
            </div>
            <div className={styles.header__nav}>
                <ul className={styles.header__nav__links}>
                    <li className={styles.header__nav__link}>
                        <Link href="/">Accueil</Link>
                        
                    </li>
                    <li className={styles.header__nav__link}>
                        <Link href="/podcasts">Podcasts</Link>
                    </li>
                    <li className={styles.header__nav__link}>
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