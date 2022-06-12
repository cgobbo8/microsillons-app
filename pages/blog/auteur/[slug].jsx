
import Seo from "../../../components/bloc/seo";
import { Section } from "../../../components/common/Section";
import { SectionTitle } from "../../../components/common/SectionTitle";
import { AuthorSignature } from "../../../components/component/AuthorSignature";
import { InfiniteArticles } from "../../../components/sections/ArticlesByType/InfiniteArticles";
import { fetchAPI } from "../../../lib/api"; 
import { getFirstLetter, isVowel } from "../../../utils";
import style from './AuthorPage.module.scss'


const AuteurPage = ({ articles, author, blog }) => {


  return (
    <div className={style.author_page} >
      <Seo seo={blog.attributes.seo} />
      <span style={{width : '100%'}}>
        <AuthorSignature author={{data : author}} /> 
      </span>
      <Section className={style.author_page__section}>
            <SectionTitle text={`Explorez les articles ${isVowel(getFirstLetter(author.attributes.prenom)) ? "d'" : 'de'}`} accentText={`${author.attributes.prenom}`} />
            <InfiniteArticles articles={articles} authorSlug={author.attributes.slug} />
        </Section>
      
    </div>
    );
};

export async function getStaticPaths() {
  const auteursRes = await fetchAPI("/auteurs", { fields: ["slug"] });

  return {
    paths: auteursRes.data.map((auteur) => ({
      params: {
        slug: auteur.attributes.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const articlesRes = await fetchAPI("/articles", {
    pagination: {
      start: 0,
      limit: 2
  },
    filters: {
      auteur : {
        slug : params.slug
      }
    },
    populate: ["cover", "podcast_types", "auteur.avatar", "sections"],
  });

  const authorRes = await fetchAPI("/auteurs", {
    populate : ["avatar"],
    filters: {
      slug: params.slug,
    },
  });

  const blogRes = await fetchAPI("/blog", {
    populate: {
      hero: "*",
      seo: { populate: "*" },
    },
  })

  return {
    props: { articles: articlesRes.data, author : authorRes.data[0], blog : blogRes.data },
    revalidate: 100,
  };
}

export default AuteurPage;