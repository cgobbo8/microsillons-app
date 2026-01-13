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
      <Seo seo={blog?.attributes?.seo} />
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
  try {
    const [articlesRecentsRes, articlesRes, categoriesRes, blogRes, auteursRes] = await Promise.all([
      fetchAPI("/articles", {
        pagination: {
          pageSize: 4
        },
        populate: "*",
        sort: "publishedAt:DESC"
      }).catch(() => ({ data: [] })),
      fetchAPI("/articles", {
        populate: "*",
        pagination: {
          start: 0,
          limit: 8
        },
        sort: "publishedAt:DESC"
      }).catch(() => ({ data: [] })),
      fetchAPI("/podcast-types", { populate: "*" }).catch(() => ({ data: [] })),
      fetchAPI("/blog", {
        populate: {
          hero: "*",
          seo: { populate: "*" },
        },
      }).catch(() => ({ data: { attributes: {} } })),
      fetchAPI("/auteurs", {
        populate: "*",
      }).catch(() => ({ data: [] })),
    ]);

    return {
      props: {
        articlesRecents: articlesRecentsRes.data || [],
        articles: articlesRes.data || [],
        categories: categoriesRes.data || [],
        blog: blogRes.data || { attributes: {} },
        auteurs: auteursRes.data || []
      },
      revalidate: 100,
    };
  } catch (error) {
    console.error('Error fetching blog page data:', error);
    return {
      props: {
        articlesRecents: [],
        articles: [],
        categories: [],
        blog: { attributes: {} },
        auteurs: []
      },
      revalidate: 100,
    };
  }
}

export default blog