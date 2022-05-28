import Articles from "../components/bloc/articles";
import Seo from "../components/bloc/seo";
import EmblaCarousel from "../components/common/EmblaCarousel";
import { CarouselArticles } from "../components/common/Flickity";
import { AssociationSection } from "../components/sections/association";
import { EmissionsSection } from "../components/sections/emissions";
import { EquipeSection } from "../components/sections/equipeSection";
import { RadioSection } from "../components/sections/radio";
import { SeriesSection } from "../components/sections/series";
import { fetchAPI } from "../lib/api";

const SLIDE_COUNT = 5;
const slides = Array.from(Array(SLIDE_COUNT).keys());

const Home = ({ articles, slides, categories, homepage, emissions, series, equipe }) => {
  console.log(homepage.attributes);
  console.log("emission : ");
  console.log(emissions);
  console.log("series : ");
  console.log(series);
  console.log("equipe : ");
  console.log(equipe);
  return (
    <div >
      <Seo seo={homepage.attributes.seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          {/* <h1>{homepage.attributes.titrePage}</h1> */}
          {/* <CarouselArticles /> */}
          <EmblaCarousel slides={slides} />
          <AssociationSection association={homepage.attributes.association_bloc} />
          <RadioSection radio={homepage.attributes.radio_bloc} />
          <EmissionsSection emissionsInfo={homepage.attributes.emissions_bloc} emissions={emissions} />
          <SeriesSection seriesInfo={homepage.attributes.series_bloc} series={series} />
          <EquipeSection equipeInfo={homepage.attributes.equipe_bloc} equipe={equipe} />
          {/* <Articles articles={articles} /> */}
        </div>
      </div>
    </div>
  )
}

export default Home;

export async function getStaticProps() {
  // Run API calls in parallel
  const [articlesRes, slidesRes, categoriesRes, homepageRes, emissionsRes, seriesRes, equipesRes] = await Promise.all([
    fetchAPI("/articles", { populate: "*" }),
    fetchAPI("/articles", { pagination: {
      pageSize: 4,
    }, populate: "*" }),
    fetchAPI("/podcast-types", { populate: "*" }),
    fetchAPI("/homepage", {
      populate: {
        hero: "*",
        seo: { populate: "*" },
        association_bloc: { populate: "*", liste : { populate : '*'} },
        'association_bloc.liste' : { populate: "*" },

        radio_bloc : { populate: "*" },
        emissions_bloc: { populate: "*" },
        series_bloc : { populate: "*" },
        equipe_bloc: { populate: "*" },
      },
    }),
    fetchAPI("/emissions", {
      populate: "*"
    }),
    fetchAPI("/series", {
      populate: "*"
    }),
    fetchAPI("/equipes", {
      populate: "*"
    }),
  ]);

  return {
    props: {
      articles: articlesRes.data,
      slides: slidesRes.data,
      categories: categoriesRes.data,
      homepage: homepageRes.data,
      emissions: emissionsRes.data,
      series: seriesRes.data,
      equipe: equipesRes.data,
    },
    revalidate: 1,
  };
}

