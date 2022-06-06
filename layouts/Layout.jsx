import { useEffect } from 'react';
import { useContext } from 'react';
import { Navbar } from '../components/common/Navbar';
import { Sidebar } from '../components/common/Sidebar';
import { TransitionContext } from '../contexts/TransitionContext';
import styles from './Layout.module.scss';


export const Layout = ({ children, live }) => {
    
    const { loading } = useContext(TransitionContext);

    return (
        <div id='root' className={styles.layout}>
            <div className={styles.layout__container}>
                <Navbar />
                
                <Sidebar live={live} className={styles.sidebar} />
                <main  className={styles.content}>
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

  