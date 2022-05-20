import SidebarWidget from '../SidebarWidget';
import styles from './Sidebar.module.scss'

export const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <SidebarWidget />
        </div>
    )
}

