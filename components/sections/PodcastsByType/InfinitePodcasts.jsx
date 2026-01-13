import { useContext, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { TransitionContext } from '../../../contexts/TransitionContext';
import { useOnScreen } from '../../../hooks/useOnScreen';
import { fetchAPI } from '../../../lib/api';
import ImagePerso from '../../bloc/image';
import styles from './InfinitePodcasts.module.scss';
import { useRouter } from 'next/router';
import Moment from 'react-moment';
import 'moment/locale/fr';
import { PodcastContext } from '../../../contexts/PodcastContext';

import { Audio } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export const InfinitePodcasts = ({ podcasts = [], categorySelected, authorSlug = null, filters, podcastsLoading, filterWord }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [podcastsToShow, setPodcastsToShow] = useState(podcasts || []);
  const [hasMore, setHasMore] = useState(true);
  const { setCurrentPodcast } = useContext(PodcastContext);
  const router = useRouter();

  useEffect(() => {
    setPodcastsToShow(podcasts || []);
    setHasMore(true);
    setIsLoading(false);
  }, [podcasts]);

  const ref = useRef();
  const refContainer = useRef();
  const [isVisible, count] = useOnScreen(ref);

  const getMorePost = async () => {
    setIsLoading(true);
    const currentPodcasts = podcastsToShow || [];
    let lengthBefore = currentPodcasts.length;

    try {
      const res = await fetchAPI('/podcasts', {
        populate: '*',
        pagination: {
          start: currentPodcasts.length,
          limit: 3
        },
        filters: { ...filters },
        sort: 'publishedAt:DESC'
      });

      const newData = res?.data || [];
      let lengthAfter = [...currentPodcasts, ...newData].length;

      if (lengthAfter === lengthBefore) {
        setHasMore(false);
      }
      setPodcastsToShow((prev) => [...(prev || []), ...newData]);
    } catch (error) {
      console.error('Error fetching more podcasts:', error);
      setHasMore(false);
    }
    setIsLoading(false);
  };

  const scrollToTop = () => {
    refContainer.current.scrollIntoView({ top: -1000, behavior: 'smooth' });
  };

  useEffect(() => {
    if (isVisible) {
      getMorePost();
    }
  }, [isVisible, count]);

  const handlePlayPodcast = (e, podcast) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentPodcast(podcast);
  };

  return (
    <>
      {podcastsLoading ? (
        <span style={{ marginTop: 100 }}>
          <Audio height="50" width="80" radius="9" color="green" ariaLabel="three-dots-loading" wrapperStyle wrapperClass />
        </span>
      ) : (
        <>
          <div id="scrollableDiv" className={styles.infinite_articles} ref={refContainer}>
            {(podcastsToShow || []).map((data, index) => {
              let word =
                filters &&
                filters?.$or &&
                filters?.$or[0]?.[Object.keys(filters?.$or[0])?.[0]] &&
                filters?.$or[0]?.[Object.keys(filters?.$or[0])?.[0]][Object.keys(filters?.$or[0][Object.keys(filters?.$or[0])?.[0]])?.[0]] &&
                filters?.$or[0]?.[Object.keys(filters?.$or[0])?.[0]][Object.keys(filters?.$or[0][Object.keys(filters?.$or[0])?.[0]])?.[0]].$containsi;
              return (
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => handlePlayPodcast(e, data)}
                  className={`${styles['infinite_articles__article']} ${data.attributes?.important ? 'important' : ''}`}
                  key={index}>
                  <div className={styles['infinite_articles__article--image']}>
                    <ImagePerso image={data.attributes?.podcast_thumbnail} directUrl />
                    <span className={styles['infinite_articles__article--image--duration']}>
                      {millisecondsToMinutesAndSeconds(data.attributes?.podcast_duration)}
                    </span>
                  </div>
                  <div className={styles['infinite_articles__article__info']}>
                    <div className={styles['infinite_articles__article__info--types']}>
                      {data.attributes?.podcast_types?.data?.map((type, index) => (
                        <span key={index}>
                          {filterWord ? (
                            <span className={styles['infinite_articles__article__info--types__type']}>
                              {index === 0 ? '' : ' / '}
                              <span dangerouslySetInnerHTML={{ __html: filterText(type.attributes?.type || '', filterWord) }}></span>
                            </span>
                          ) : (
                            <span className={styles['infinite_articles__article__info--types__type']}>
                              {index === 0 ? '' : ' / '}
                              {type.attributes?.type}
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                    <div className={styles['infinite_articles__article__info--title']}>
                      {filterWord ? (
                        <span dangerouslySetInnerHTML={{ __html: filterText(data.attributes?.podcast_title || '', filterWord) }}></span>
                      ) : (
                        <span>{data.attributes?.podcast_title}</span>
                      )}
                    </div>
                    <div className={`${styles['infinite_articles__article__info--divider']} divider`}></div>

                    <div className={styles['infinite_articles__article__info--desc']}>
                      {filterWord ? (
                        <span dangerouslySetInnerHTML={{ __html: filterText(data.attributes?.podcast_description || '', filterWord) }}></span>
                      ) : (
                        <span>{data.attributes?.podcast_description}</span>
                      )}
                    </div>
                    {data.attributes?.auteurs?.data?.length > 0 ? (
                      <div className={styles['infinite_articles__article__info--authors']}>
                        <span className="authors">
                          Publié par
                          {data.attributes.auteurs.data.map((auteur, index) => (
                            <span className={styles['infinite_articles__article__info--authors--author']} key={index}>
                              {filterWord ? (
                                <span>
                                  {index === 0 ? '' : ', '}{' '}
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: filterText(`${auteur.attributes?.prenom || ''} ${auteur.attributes?.nom || ''}`, filterWord)
                                    }}></span>{' '}
                                </span>
                              ) : (
                                <span>
                                  {index === 0 ? '' : ', '} {auteur.attributes?.prenom} {auteur.attributes?.nom}
                                </span>
                              )}
                            </span>
                          ))}{' '}
                          le{' '}
                          <span className={styles['infinite_articles__article__info--date--date']}>
                            <Moment format="D MMMM YYYY" locale="fr">
                              {data.attributes?.publishedAt}
                            </Moment>
                          </span>{' '}
                          à{' '}
                          <span className={styles['infinite_articles__article__info--date--time']}>
                            <Moment format="HH:mm" locale="fr">
                              {data.attributes?.publishedAt}
                            </Moment>
                          </span>
                        </span>
                      </div>
                    ) : (
                      <div className={styles['infinite_articles__article__info--date']}>
                        Publié le{' '}
                        <span className={styles['infinite_articles__article__info--date--date']}>
                          <Moment format="D MMMM YYYY" locale="fr">
                            {data.attributes?.publishedAt}
                          </Moment>
                        </span>{' '}
                        à{' '}
                        <span className={styles['infinite_articles__article__info--date--time']}>
                          <Moment format="HH:mm" locale="fr">
                            {data.attributes?.publishedAt}
                          </Moment>
                        </span>
                      </div>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
          {(podcastsToShow || []).length === 0 ? (
            <div className={styles['infinite_articles__no_articles']}>Il n'y a pas d'articles pour cette catégorie 😞</div>
          ) : (
            <div className={styles['infinite_articles__load_more']}>
              {hasMore ? (
                <button className={styles['infinite_articles__load_more--button']} ref={ref} onClick={getMorePost}>
                  {isLoading ? 'Chargement' : 'Charger plus'}
                </button>
              ) : (
                <button className={styles['infinite_articles__load_more--button']} ref={ref} onClick={scrollToTop}>
                  Vous êtes arrivés en bas 😞
                </button>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

function millisecondsToMinutesAndSeconds(milliseconds) {
  if (!milliseconds) return '';
  var minutes = Math.floor(milliseconds / 60000);
  var seconds = ((milliseconds % 60000) / 1000).toFixed(0);
  return minutes + 'mins' + (seconds < 10 ? '0' : '') + seconds;
}

// Search what words are in filter and replace them with a span
const filterText = (text, filter) => {
  if (!text || !filter) return text || '';
  let newText = text;

  const words = newText.match(new RegExp(filter, 'gi'));

  newText = words && words[0] ? newText.replace(new RegExp(filter, 'gi'), `<span class="filter">${words[0]}</span>`) : newText;

  return newText;
};
