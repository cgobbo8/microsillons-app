import { useContext, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { TransitionContext } from '../../../contexts/TransitionContext';
import { useOnScreen } from '../../../hooks/useOnScreen';
import { fetchAPI } from '../../../lib/api';
import ImagePerso from '../../bloc/image';
import styles from './InfiniteArticles.module.scss';
import { useRouter } from 'next/router';
import Moment from 'react-moment';
import 'moment/locale/fr';
import { Audio } from 'react-loader-spinner';

export const InfiniteArticles = ({ articles = [], categorySelected, authorSlug = null, loading }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [articlesToShow, setArticlesToShow] = useState(articles || []);
  const [hasMore, setHasMore] = useState(true);
  const { transitionTo } = useContext(TransitionContext);
  const router = useRouter();

  useEffect(() => {
    setArticlesToShow(articles || []);
    setHasMore(true);
    setIsLoading(false);
  }, [articles]);

  const ref = useRef();
  const refContainer = useRef();
  const [isVisible, count] = useOnScreen(ref);

  const getMorePost = async () => {
    setIsLoading(true);
    const currentArticles = articlesToShow || [];
    let lengthBefore = currentArticles.length;

    let filters = {};

    if (categorySelected) {
      filters = {
        ...filters,
        podcast_types: {
          id: categorySelected.id
        }
      };
    }

    if (authorSlug) {
      filters = {
        ...filters,
        auteur: {
          slug: authorSlug
        }
      };
    }

    try {
      const res = await fetchAPI('/articles', {
        populate: '*',
        pagination: {
          start: currentArticles.length,
          limit: 3
        },
        filters: filters,
        sort: 'publishedAt:DESC'
      });

      const newData = res?.data || [];
      let lengthAfter = [...currentArticles, ...newData].length;

      if (lengthAfter === lengthBefore) {
        setHasMore(false);
      }
      setArticlesToShow((prev) => [...(prev || []), ...newData]);
    } catch (error) {
      console.error('Error fetching more articles:', error);
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

  const handleOpenBlog = (e, slug) => {
    e.preventDefault();
    e.stopPropagation();
    transitionTo(`/blog/${slug}`, router.route);
  };

  return (
    <>
      {loading ? (
        <span style={{ marginTop: 100, marginBottom: 500 }}>
          <Audio height="50" width="80" radius="9" color="green" ariaLabel="three-dots-loading" wrapperStyle wrapperClass />
        </span>
      ) : (
        <>
          {' '}
          <div id="scrollableDiv" className={styles.infinite_articles} ref={refContainer}>
            {(articlesToShow || []).map((data, index) => (
              <a
                onClick={(e) => handleOpenBlog(e, data.attributes?.slug)}
                href={`/blog/${data.attributes?.slug || ''}`}
                className={`${styles['infinite_articles__article']} ${data.attributes?.important ? 'important' : ''}`}
                key={index}>
                <div className={styles['infinite_articles__article--image']}>
                  <ImagePerso image={data.attributes?.cover} />
                </div>
                <div className={styles['infinite_articles__article__info']}>
                  <div className={styles['infinite_articles__article__info--types']}>
                    {data.attributes?.podcast_types?.data?.map((type, index) => (
                      <span key={index} className={styles['infinite_articles__article__info--types__type']}>
                        {index === 0 ? '' : ' / '}
                        {type.attributes?.type}
                      </span>
                    ))}
                  </div>
                  <div className={styles['infinite_articles__article__info--title']}>{data.attributes?.titre}</div>
                  <div className={`${styles['infinite_articles__article__info--divider']} divider`}></div>
                  <div className={styles['infinite_articles__article__info--date']}>
                    <span className={styles['infinite_articles__article__info--date--date']}>
                      <Moment format="D MMMM YYYY" locale="fr">
                        {data.attributes?.publishedAt}
                      </Moment>
                    </span>
                    <span className={styles['infinite_articles__article__info--date--point']}></span>
                    <span className={styles['infinite_articles__article__info--date--time']}>
                      <Moment format="HH:mm" locale="fr">
                        {data.attributes?.publishedAt}
                      </Moment>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
          {(articlesToShow || []).length === 0 ? (
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
