
import { joinStyles } from '../../../utils'
import styles from './Section.module.scss'

export const Section = ({children, className, ...props}) => {
    return (
        <section className={joinStyles(styles.section, className)} {...props}>
            {children}
        </section>
    )
}