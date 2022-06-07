 import styles from './Podcast.module.scss'
 import Link from 'next/link'
import { fetchAPI } from '../../lib/api';
import Seo from '../../components/bloc/seo';

const podcasts = ( {page}) => {
    console.log(page);
    return (
        <div className={styles.podcast__container}>
            <Seo seo={page.attributes.seo} favicon={page.attributes.favicon} />
            <img className={styles['podcast__container--image']} src="/PodcastIllustration.svg" alt="" />
            <p className={styles['podcast__container__message']}>Les podcasts seront bientôt disponibles sur <span className={styles['podcast__container__message--accent']}>microsillons</span> !</p>
            <p className={styles['podcast__container__soundcloud']}>En attendant retrouvez les sur <a href='https://soundcloud.com/micro-sillons' target='_blank' rel="noreferrer" className={styles['podcast__container__soundcloud--button']}><img className={styles['podcast__container__soundcloud--image']} src="/reseaux-sociaux/soundcloud.svg" alt="soundcloud-logo" />Souncloud</a></p>
        </div>
    )
}

export async function getStaticProps() {
    // Run API calls in parallel
    const [pageRes] = await Promise.all([
      fetchAPI("/podcast-page", {
        populate: {
          hero: "*",
          seo: { populate: "*" },
          favicon: { populate: "*" }
        },
      }),
    ]);
  
    return {
      props: {
        page: pageRes.data
      },
      revalidate: 100, 
    };
  }

export default podcasts