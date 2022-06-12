import Articles from "../../components/bloc/articles"
import { AuthorsBlog } from "../../components/bloc/authorsBlog";
import { MostRecentArticlesBlog } from "../../components/bloc/mostRecentArticlesBlog";
import Seo from "../../components/bloc/seo"
import { ArticleByType } from "../../components/sections/ArticlesByType";
import { fetchAPI } from "../../lib/api";
import styles from './Blog.module.scss'

const blog = ({ articlesRecents, articles, categories, auteurs, blog }) => {

  return (
    <div id='scrollableDiv'>
      <Seo seo={blog.attributes.seo} />
      <div className={styles.blog}>
        <section className={styles.blog__hero}>
          <div className={styles.blog__hero__most_recent}>
            <MostRecentArticlesBlog recentPosts={articlesRecents} />
          </div>
          <div className={styles.blog__hero__authors}>
            <AuthorsBlog authors={auteurs} />
          </div>
        </section>
        <ArticleByType articles={articles} categories={categories} />
      </div>
    </div>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [articlesRecentsRes, articlesRes, categoriesRes, blogRes, auteursRes] = await Promise.all([
    fetchAPI("/articles", { 
      pagination: {
        pageSize: 4
      }, 
      populate: "*",
      sort: "publishedAt:DESC"
     }),
    fetchAPI("/articles", {
      populate: "*", 
      pagination: {
        start: 0,
        limit: 8
      }, 
      sort: "publishedAt:DESC" }),
    fetchAPI("/podcast-types", { populate: "*" }),
    fetchAPI("/blog", {
      populate: {
        hero: "*",
        seo: { populate: "*" },
      },
    }),
    fetchAPI("/auteurs", {
      populate: "*",
      filters : {
        // check if author has at least one article using strapi api
      }
    }),
  ]);

  return {
    props: {
      articlesRecents : articlesRecentsRes.data,
      articles: articlesRes.data,
      categories: categoriesRes.data,
      blog: blogRes.data,
      auteurs: auteursRes.data
    },
    revalidate: 100,
  };
}

export default blog