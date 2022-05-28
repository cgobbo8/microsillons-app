import Moment from "react-moment";
import ReactMarkdown from "react-markdown";
import Seo from "../../components/bloc/seo";
import { fetchAPI } from "../../lib/api";
import { getStrapiMedia } from "../../lib/media";



const Article = ({ article, categories }) => {
    console.log(article);
  const imageUrl = getStrapiMedia(article.attributes.cover);

  const seo = {
    metaTitle: article.attributes.titre,
    metaDescription: article.attributes.description,
    shareImage: article.attributes.cover,
    article: true,
  };

  return (
    //   <div></div>
    <div >
      <Seo seo={seo} />
      <div
        id="banner"
        className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
        data-src={imageUrl}
        data-srcset={imageUrl}
        data-uk-img
      >
        <h1>{article.attributes.title}</h1>
      </div>
      <div className="uk-section">
        <div className="uk-container uk-container-small">
            {
                article.attributes.sections.map( (section, index) => {
                    switch (section.__component) {
                        case "bloc.texte-enrichi":
                            return <ReactMarkdown key={index}>{section.texte}</ReactMarkdown>
                        case "bloc.image":
                            return <img key={index} src="http://random.imagecdn.app/1920/1080" alt={section.legende} />                 
                        default:
                            return <div key={index} className="test">test</div>
                            break;
                    }
                })
            }
          <ReactMarkdown>{article.attributes.content}</ReactMarkdown>
          <hr className="uk-divider-small" />
          <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
            <div>
              {article.attributes.auteur.data.attributes.avatar && (
                <img
                  src={getStrapiMedia(
                    article.attributes.auteur.data.attributes.avatar
                  )}
                  alt={
                    article.attributes.auteur.data.attributes.avatar.data
                      .attributes.alternativeText
                  }
                  style={{
                    position: "static",
                    borderRadius: "20%",
                    height: 60,
                  }}
                />
              )}
            </div>
            <div className="uk-width-expand">
              <p className="uk-margin-remove-bottom">
                By {article.attributes.auteur.data.attributes.prenom} {article.attributes.auteur.data.attributes.nom}
              </p>
              <p className="uk-text-meta uk-margin-remove-top">
                <Moment format="MMM Do YYYY">
                  {article.attributes.published_at}
                </Moment>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const articlesRes = await fetchAPI("/articles", { fields: ["slug"] });

  return {
    paths: articlesRes.data.map((article) => ({
      params: {
        slug: article.attributes.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const articlesRes = await fetchAPI("/articles", {
    filters: {
      slug: params.slug,
    },
    // populate: "*",
    populate: ["cover", "podcast_type", "auteur.avatar", "sections"],
  });
  const categoriesRes = await fetchAPI("/podcast-types");

  return {
    props: { article: articlesRes.data[0], categories: categoriesRes },
    revalidate: 1,
  };
}

export default Article;