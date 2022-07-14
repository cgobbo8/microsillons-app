import { useContext, useEffect, useRef, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component";
import { TransitionContext } from "../../../contexts/TransitionContext";
import { useOnScreen } from "../../../hooks/useOnScreen";
import { fetchAPI } from "../../../lib/api";
import ImagePerso from "../../bloc/image";
import styles from './InfinitePodcasts.module.scss'
import { useRouter } from 'next/router'
import Moment from "react-moment";
import 'moment/locale/fr';
import { PodcastContext } from "../../../contexts/PodcastContext";


export const InfinitePodcasts = ({ podcasts, categorySelected, authorSlug = null }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [podcastsToShow, setPodcastsToShow] = useState(podcasts);
    const [hasMore, setHasMore] = useState(true);
    const { setCurrentPodcast } = useContext(PodcastContext);
    const router = useRouter()


    useEffect(() => {
        setPodcastsToShow(podcasts);
        setHasMore(true);
        setIsLoading(false);
    }, [podcasts])


    const ref = useRef()
    const refContainer = useRef()
    const isVisible = useOnScreen(ref)

    const getMorePost = async () => {
        setIsLoading(true)
        let lengthBefore = podcastsToShow.length;


        let filters = {}


        if (categorySelected) {
            filters = {
                ...filters,
                podcast_types : {
                    id: categorySelected.id
                }
            }
        }

        if (authorSlug) {
            filters = {
                ...filters,
                auteur : {
                    slug: authorSlug
                }
            }
        }
            
        
        const res = await fetchAPI("/podcasts", {
            populate: "*",
            pagination: {
                start: podcastsToShow.length,
                limit: 3
            },
            filters: filters,
            sort: "publishedAt:DESC"
        })


        let lengthAfter = [...podcastsToShow, ...res.data].length;

        if (lengthAfter === lengthBefore) {
            setHasMore(false);
        }
        // const newPosts = await res.json();
        setPodcastsToShow((podcastsToShow) => [...podcastsToShow, ...res.data]);
        setIsLoading(false)

    };

    const scrollToTop = () => {
        refContainer.current.scrollIntoView({ top: -1000, behavior: "smooth" })
    }

    useEffect(() => {
        if (isVisible) {
            getMorePost();
        }
    }, [isVisible]);

    const handlePlayPodcast = (e, podcast) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentPodcast(podcast)
    };


    return (
        <>
            <div
                id="scrollableDiv"
                className={styles.infinite_articles}
                ref={refContainer}
            >
                {podcastsToShow.map((data, index) => (

                    <a style={{cursor : 'pointer'}} onClick={(e) => handlePlayPodcast(e,data)} className={`${styles['infinite_articles__article']} ${data.attributes.important ? 'important' : ''}`} key={index}>
                        <div className={styles['infinite_articles__article--image']}>
                            <ImagePerso image={data.attributes.podcast_thumbnail} directUrl />
                        </div>
                        <div className={styles['infinite_articles__article__info']}>
                            <div className={styles['infinite_articles__article__info--types']}>
                                {
                                    data.attributes.podcast_types.data?.map((type, index) => (
                                        <span key={index} className={styles['infinite_articles__article__info--types__type']}>{index === 0 ? '' : ' / '}{type.attributes.type}</span>
                                    ))
                                }
                            </div>
                            <div className={styles['infinite_articles__article__info--title']}>{data.attributes.podcast_title}</div>
                            <div className={`${styles['infinite_articles__article__info--divider']} divider`}></div>
                            <div className={styles['infinite_articles__article__info--date']}>
                                <span className={styles['infinite_articles__article__info--date--date']}>
                                    <Moment format="D MMMM YYYY" locale="fr">
                                        {data.attributes.publishedAt}
                                    </Moment>
                                </span>
                                <span className={styles['infinite_articles__article__info--date--point']}></span>
                                <span className={styles['infinite_articles__article__info--date--time']}>
                                    <Moment format="HH:mm" locale="fr">
                                        {data.attributes.publishedAt}
                                    </Moment>
                                </span>
                            </div>
                        </div>

                    </a>
                ))}
            </div>
            {podcastsToShow.length === 0 ?

                <div className={styles['infinite_articles__no_articles']}>
                    Il n'y a pas d'articles pour cette catégorie 😞
                </div>
                :
                <div className={styles['infinite_articles__load_more']}>
                    {
                        hasMore ? (
                            <button className={styles['infinite_articles__load_more--button']} ref={ref} onClick={getMorePost}>{isLoading ? 'Chargement' : 'Charger plus'}</button>
                        ) : (
                            <button className={styles['infinite_articles__load_more--button']} ref={ref} onClick={scrollToTop}>Vous êtes arrivés en bas 😞</button>
                        )
                    }
                </div>
            }
        </>


    )

}