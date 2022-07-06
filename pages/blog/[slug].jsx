import Moment from "react-moment";
import ReactMarkdown from "react-markdown";
import Seo from "../../components/bloc/seo";
import { fetchAPI } from "../../lib/api";
import { getStrapiMedia } from "../../lib/media";
import styles from './Article.module.scss'
import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from "../_app";
import { joinStyles } from "../../utils";
import gsap from "gsap";
import { TransitionContext } from "../../contexts/TransitionContext";
import ImagePerso from "../../components/bloc/image";
import NextImage from 'next/image'
import 'moment/locale/fr'
import { ButtonSecondary } from "../../components/common/Button";
import { AuthorSignature } from "../../components/component/AuthorSignature";
import { CloseButton } from "../../components/common/CloseButton";


const Article = ({ article, categories }) => {
  const imageUrl = getStrapiMedia(article.attributes.cover);

  const { reinitTransition, backTo } = useContext(TransitionContext);

  const [mounted, setMounted] = useState(false);
  const [transitionOk, setTransitionOk] = useState(false);

  const tl = gsap.timeline({ paused: true });

  useEffect(() => {
    window.scrollTo(0, 0)
    setMounted(true);

    reinitTransition();



    setTimeout(() => {
      gsap.set(".article__container", {
        opacity: 1,
        y: 1000,
        scale: 0.9,
        ease: "power2.inOut",
      });

      tl.to(".article__container", {
        duration: 0.7,
        opacity: 1,
        // slide down
        y: 0,
        scale: 1,
        ease: "power2.inOut",
      });

      setTransitionOk(true);
    }, 1);
  }, []);

  useEffect(() => {
    tl.play();
  }, [transitionOk]);

  const seo = {
    metaTitle: article.attributes.titre,
    metaDescription: article.attributes.description,
    shareImage: article.attributes.cover,
    article: true,
  };

  const close = () => {
    backTo()
  };

  return mounted && createPortal(
    <div className={`${joinStyles(styles.article, 'article__container')} ${transitionOk ? '' : 'hide'}`} >
      <Seo seo={seo} />
      <div className={styles.article__container}>
        <div className={styles.article__container__cover}>
          <div style={{position : 'absolute', top : '18px', right : '64px'}}>
            <CloseButton onClick={close} />
          </div>
          <div className={styles['article__container__cover--overlay']}></div>
          <ImagePerso image={article.attributes.cover} layout="fill" objectFit="cover" className={styles['article__container__cover--image']} src={getStrapiMedia(article.attributes.cover)} alt="" />

          <div className={styles.article__container__cover__bloc}>
            <span className={styles['article__container__cover__bloc__top']}>
              <h1 className={styles['article__container__cover__bloc__top--title']}>{article?.attributes?.titre}</h1>
              <span className={styles['article__container__cover__bloc__top--date']}>Il y a <Moment fromNow ago locale="fr">{article.attributes.publishedAt}</Moment></span>
            </span>
            <div className={styles['article__container__cover__bloc--categories']}>{article.attributes?.podcast_types?.data.map(((type, index) => <span key={index} className={styles['article__container__cover__bloc--category']}>{type.attributes.type}</span>))}</div>
          </div>
          {/* <ImagePerso className={styles['article__container__cover--image']} image={article.attributes.cover} /> */}
        </div>

        <div className={styles.article__content}>
          {
            article?.attributes?.sections?.map((section, index) => {
              switch (section.__component) {
                case "bloc.texte-enrichi":
                  return <ReactMarkdown key={index}>{section.texte}</ReactMarkdown>
                case "bloc.image":
                  break;
                  // return <ImagePerso image={section} />
                  // return <div>{JSON.stringify(section)}</div>
                  // return <img key={index} src="http://random.imagecdn.app/1920/1080" alt={section.legende} />
                default:
                  return <div key={index} className="test">test</div>
                  break;
              }
            })
          }
        </div>
        <AuthorSignature author={article?.attributes?.auteur} article={article} isBlogPost />
      </div>
    </div>
    , document.getElementById("root"));
};

export async function getStaticPaths() {
  const articlesRes = await fetchAPI("/articles", { fields: ["slug"] });

  return {
    paths: articlesRes.data.map((article) => ({
      params: {
        slug: article.attributes.slug,
      },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const articlesRes = await fetchAPI("/articles", {
    filters: {
      slug: params.slug,
    },
    populate: ["cover", "podcast_types", "auteur.avatar", "sections"],
  });
  const categoriesRes = await fetchAPI("/podcast-types");

  return {
    props: { article: articlesRes.data[0], categories: categoriesRes },
    revalidate: 100,
  };
}

export default Article;