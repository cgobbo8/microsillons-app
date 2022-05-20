import { Navbar } from '../components/common/Navbar';
import { Sidebar } from '../components/common/Sidebar';
import styles from './Layout.module.scss';


export const Layout = ({ children }) => (
    <div className={styles.layout}>
        <Navbar />
        
        <Sidebar className={styles.sidebar} />
        <main className={styles.content}>
            {children}
        </main>
    </div>
);
