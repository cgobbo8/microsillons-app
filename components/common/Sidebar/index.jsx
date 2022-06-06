import { Countdown } from '../../component/Countdown';
import SidebarWidget from '../SidebarWidget';
import styles from './Sidebar.module.scss'

export const Sidebar = ({live}) => {
    return (
        <div className={styles.sidebar}>
            <span className={styles.sidebar__up}>
                <Countdown live={live} />
            </span>
            <span className={styles.sidebar__bottom}>
                <SidebarWidget />
            </span>
        </div>
    )
}

