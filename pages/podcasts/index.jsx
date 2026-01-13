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


const Podcasts = ({page, podcasts, categories}) => {

    const { setCurrentPodcast } = useContext(PodcastContext);

    const handlePodcastClick = (podcast) => {
      if (podcast?.attributes?.podcast_url) {
        setCurrentPodcast(podcast.attributes.podcast_url);
      }
    }

    return (
        <div className={styles.podcast__container}>
            <Seo seo={page?.attributes?.seo} favicon={page?.attributes?.favicon} />
      
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
    try {
      const [pageRes, podcastsRes, categoriesRes] = await Promise.all([
        fetchAPI("/podcast-page", {
          populate: {
            hero: "*",
            seo: { populate: "*" },
            favicon: { populate: "*" }
          },
        }).catch(() => ({ data: { attributes: {} } })),
        fetchAPI("/podcasts", {
          pagination: {
            start: 0,
            limit: 8
          },
          populate: "*",
          sort: "publishedAt:DESC"
        }).catch(() => ({ data: [] })),
        fetchAPI("/podcast-types", { populate: "*" }).catch(() => ({ data: [] })),
      ]);

      return {
        props: {
          page: pageRes.data || { attributes: {} },
          podcasts: podcastsRes.data || [],
          categories: categoriesRes.data || [],
        },
        revalidate: 100,
      };
    } catch (error) {
      console.error('Error fetching podcast page data:', error);
      return {
        props: {
          page: { attributes: {} },
          podcasts: [],
          categories: [],
        },
        revalidate: 100,
      };
    }
  }

export default Podcasts