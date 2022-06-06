import Articles from "../../components/bloc/articles"
import Seo from "../../components/bloc/seo"
import { fetchAPI } from "../../lib/api";


const blog = ({ articles, categories, blog }) => {
    return (
        <div >
          <Seo seo={blog.attributes.seo} />
          <div className="uk-section">
            <div className="uk-container uk-container-large">
              <h1>{blog.attributes.titrePage}</h1>
              <Articles articles={articles} />
            </div>
          </div>
        </div>
      )
}

export async function getStaticProps() {
    // Run API calls in parallel
    const [articlesRes, categoriesRes, blogRes] = await Promise.all([
      fetchAPI("/articles", { populate: "*" }),
      fetchAPI("/podcast-types", { populate: "*" }),
      fetchAPI("/blog", {
        populate: {
          hero: "*",
          seo: { populate: "*" },
        },
      }),
    ]);
  
    return {
      props: {
        articles: articlesRes.data,
        categories: categoriesRes.data,
        blog: blogRes.data,
      },
      revalidate: 10000,
    };
  }

export default blog