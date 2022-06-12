

import { joinStyles } from '../../../utils';
import { Countdown } from '../../component/Countdown';
import { Disc } from '../../svgs';
import styles from './SidebarWidget.module.scss'

const SidebarWidget = () => {
    return (
        <div className={styles.widget}>
            <div className={joinStyles(styles.music, styles.card)}>
                {/* <div className={styles.music__disc}>
                    <Disc />
                </div> */}
                <div className={styles.music__content}>
                    {/* <h3 className={joinStyles('p-1', 'dark', styles.music__content__title)}>Les podcats arrivent bientôt sur microsillons</h3> */}
                    <p className={joinStyles('p-2', 'light', styles.music__content__baseline)}>Les podcats arrivent bientôt sur microsillons</p>
                </div>
            </div>
        </div>
    )
}

export default SidebarWidget;