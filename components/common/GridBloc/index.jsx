
import styles from './GridBloc.module.scss'

export const GridBloc = ({children}) => {
    return (
        <div className={styles.grid_bloc}>
            {children}
        </div>
    )
}