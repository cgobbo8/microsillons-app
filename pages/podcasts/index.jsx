 import styles from './Podcast.module.scss'
 import Link from 'next/link'

const podcasts = () => {
    return (
        <div className={styles.podcast__container}>
            <img className={styles['podcast__container--image']} src="/PodcastIllustration.svg" alt="" />
            <p className={styles['podcast__container__message']}>Les podcasts seront bientôt disponibles sur <span className={styles['podcast__container__message--accent']}>microsillons</span> !</p>
            <p className={styles['podcast__container__soundcloud']}>En attendant retrouvez les sur <a href='https://soundcloud.com/micro-sillons' target='_blank' rel="noreferrer" className={styles['podcast__container__soundcloud--button']}><img className={styles['podcast__container__soundcloud--image']} src="/reseaux-sociaux/soundcloud.svg" alt="soundcloud-logo" />Souncloud</a></p>
        </div>
    )
}

export default podcasts