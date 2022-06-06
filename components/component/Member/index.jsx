import { joinStyles } from "../../../utils"
import ImagePerso from "../../bloc/image"
import styles from './Member.module.scss'

export const Member = ({firstname, lastname, picture, job}) => {
    return (
        <div className={styles.member}>
            <div className={styles.member__image}><ImagePerso  image={picture} /></div>
            
            <div className={styles.member__infos}>
                <h3 className={joinStyles(styles.member__infos__name, 'p-4')}>{firstname} {lastname}</h3>
                <p className={styles.member__infos__job}>{job}</p>
            </div>
        </div>
    )
}