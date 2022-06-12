import styles from './SectionTitle.module.scss'

export const SectionTitle = ({text, accentText}) => {
    return (
        <h3 className={styles['title']}>{text} <span className={styles['title--accent']}>{accentText}</span></h3>
    )
}