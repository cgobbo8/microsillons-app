 import styles from './Podcast.module.scss'
 import Link from 'next/link'
import { fetchAPI } from '../../lib/api';
import Seo from '../../components/bloc/seo';
import { ButtonPrimary } from '../../components/common/Button';
import ReactPlayer from "react-player"
import { useState } from 'react';
import { useContext } from 'react';
import { PodcastContext } from '../../contexts/PodcastContext';
import { PodcastsByType } from '../../components/sections/PodcastsByType';

// import SC from '../../lib/soundcloud';

const podcasts = ({page, podcasts, categories}) => {

    const { setCurrentPodcast } = useContext(PodcastContext);

    const handlePodcastClick = (podcast) => {
      setCurrentPodcast(podcast.attributes.podcast_url);
      // console.log(podcast);
    }

    // console.log(SC);
    return (
        <div className={styles.podcast__container}>
            <Seo seo={page.attributes.seo} favicon={page.attributes.favicon} />
      
            <PodcastsByType podcasts={podcasts} categories={categories} />

            {/* <img className={styles['podcast__container--image']} src="/PodcastIllustration.svg" alt="" />
            <p className={styles['podcast__container__message']}>Les podcasts seront bientôt disponibles sur <span className={styles['podcast__container__message--accent']}>microsillons</span> !</p>
            <p className={styles['podcast__container__soundcloud']}>En attendant retrouvez les sur <a href='https://soundcloud.com/micro-sillons' target='_blank' rel="noreferrer" className={styles['podcast__container__soundcloud--button']}><img className={styles['podcast__container__soundcloud--image']} src="/reseaux-sociaux/soundcloud.svg" alt="soundcloud-logo" />Souncloud</a></p>

            <div>
              {
                podcasts.map((podcast, index) => {
                  return (
                    <ButtonPrimary onClick={() => handlePodcastClick(podcast)} key={podcast.id}>{podcast.attributes.podcast_title}</ButtonPrimary>
                  )
                }
              )}
            </div> */}
              
        </div>
    )
}

export async function getStaticProps() {
    // Run API calls in parallel
    const [pageRes, podcastsRes, categoriesRes] = await Promise.all([
      fetchAPI("/podcast-page", {
        populate: {
          hero: "*",
          seo: { populate: "*" },
          favicon: { populate: "*" }
        },
      }),
      fetchAPI("/podcasts", { 
        pagination: {
          start: 0,
          limit: 8
        }, 
        populate: "*",
        sort: "publishedAt:DESC"
       }),
       fetchAPI("/podcast-types", { populate: "*" }),
    ]);
  
    return {
      props: {
        page: pageRes.data,
        podcasts: podcastsRes.data,
        categories : categoriesRes.data,
      },
      revalidate: 100, 
    };
  }

export default podcasts