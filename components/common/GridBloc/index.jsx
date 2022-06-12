
import styles from './GridBloc.module.scss'

export const GridBloc = ({children, fullWidth}) => {
    return (
        <div className={styles.grid_bloc} style={{width : `${fullWidth ? '100%' : 'auto'}`}}>
            {children}
        </div>
    )
}