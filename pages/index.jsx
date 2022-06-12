import Articles from "../components/bloc/articles";
import Seo from "../components/bloc/seo";
import EmblaCarousel from "../components/common/EmblaCarousel";
import { CarouselArticles } from "../components/common/Flickity";
import { AssociationSection } from "../components/sections/association";
import { CompagnonsSection } from "../components/sections/compagnons";
import { EmissionsSection } from "../components/sections/emissions";
import { EquipeSection } from "../components/sections/equipeSection";
import { RadioSection } from "../components/sections/radio";
import { SeriesSection } from "../components/sections/series";
import { fetchAPI } from "../lib/api";


const Home = ({ articles, slides, categories, homepage, emissions, series, equipe, compagnons }) => {

  console.log(compagnons);
  return (
    <div>
      <Seo seo={{...homepage.attributes.seo, title : homepage.attributes.titrePage }} />
      <div className="">
        <div className="">
          {/* <h1>{homepage.attributes.titrePage}</h1> */}
          {/* <CarouselArticles /> */}
          <EmblaCarousel slides={slides} />
          <AssociationSection association={homepage.attributes.association_bloc} />
          <RadioSection radio={homepage.attributes.radio_bloc} />
          <EmissionsSection emissionsInfo={homepage.attributes.emissions_bloc} emissions={emissions} />
          <SeriesSection seriesInfo={homepage.attributes.series_bloc} series={series} />
          <EquipeSection equipeInfo={homepage.attributes.equipe_bloc} equipe={equipe} />
          <CompagnonsSection compagnons={compagnons} />
          {/* <Articles articles={articles} /> */}
        </div>
      </div>
    </div>
  )
}

export default Home;

export async function getStaticProps() {
  // Run API calls in parallel
  const [articlesRes, slidesRes, categoriesRes, homepageRes, emissionsRes, seriesRes, equipesRes, compagnonsRes] = await Promise.all([
    fetchAPI("/articles", { populate: "*" }),
    fetchAPI("/articles", { 
      pagination: {
        pageSize: 4
      }, 
      populate: "*",
      sort: "publishedAt:DESC"
     }),
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
    fetchAPI("/sponsors", {
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
      compagnons : compagnonsRes.data
    },
    revalidate: 100, 
  };
}

