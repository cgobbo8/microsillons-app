import styles from './ListBloc.module.scss'

export const ListBloc = ({list}) => {
    return (
        <ul className={styles.list}>
            { list.map(item => <li key={item.id} className={styles.list__text}>{item.texte}</li> ) }
        </ul>
    )
}