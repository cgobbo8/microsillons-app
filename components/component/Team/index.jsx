import { Member } from "../Member"
import styles from './Team.module.scss'

export const Team = ({team = {}}) => {
    if (!team || Object.keys(team).length === 0) return null;

    return (
        <div className={styles.team}>
            {
                Object.keys(team).sort().map((key, index) => {
                    return (
                        <div className={styles.team__section} key={index}>
                            <h2 className={styles['team__section--letter']}>{key}</h2>
                            <div className={styles['team__section--members']}>
                                {
                                    (team[key] || []).map((membre, indexBis) => {
                                        return (
                                            <Member key={indexBis} firstname={membre.attributes?.prenom} lastname={membre.attributes?.nom} picture={membre.attributes?.photo} job={membre.attributes?.poste} />
                                        )
                                    })
                                }
                            </div>

                        </div>
                    )
                })
            }
        </div>

    )
}