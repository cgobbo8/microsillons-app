import ImagePerso from '../../bloc/image'
import styles from './SerieComponent.module.scss'

export const SerieComponent = ({ serie }) => {
    console.log(serie);


    return (
        <a href={serie.attributes.lien ? serie.attributes.lien : 'https://soundcloud.com/micro-sillons' } target="_blank" rel="noreferrer" className={styles.card}>
            <div className={styles.card__top}>
                <div className={styles['card__top--left']}>
                    <ImagePerso image={serie.attributes.image} />
                </div>
                <div className={styles['card__top__info']}>
                    <div className={styles['card__top__info--header']}>
                        <p className={styles['card__top__info--title']}>{serie.attributes.titre}</p> 
                        <div className={styles['card__top__info--type']}>{serie.attributes.type.data.attributes.type}</div>
                    </div>
                    <div className={styles['card__top__info--tags']}>{serie.attributes.tags.map((tag) => {
                        return <span className={styles['card__top__info--tag']} key={tag.id}>{tag.texte}</span>
                    })}</div>
                </div>
            </div>
            <div className={styles.card__text}>
                {serie.attributes.description}
            </div>
            
        </a>
    )
}