import Articles from '../components/bloc/articles';
import Seo from '../components/bloc/seo';
import EmblaCarousel from '../components/common/EmblaCarousel';
import { CarouselArticles } from '../components/common/Flickity';
import { AssociationSection } from '../components/sections/association';
import { CompagnonsSection } from '../components/sections/compagnons';
import { EmissionsSection } from '../components/sections/emissions';
import { EquipeSection } from '../components/sections/equipeSection';
import { RadioSection } from '../components/sections/radio';
import { SeriesSection } from '../components/sections/series';
import { fetchAPI } from '../lib/api';

const Home = ({ articles, slides, categories, homepage, emissions, series, equipe, compagnons, openContact }) => {
  return (
    <div>
      <Seo seo={{ ...homepage?.attributes?.seo, title: homepage?.attributes?.titrePage }} />
      <div className="">
        <div className="">
          {slides?.length > 0 && <EmblaCarousel slides={slides} />}
          {homepage?.attributes?.association_bloc && <AssociationSection association={homepage.attributes.association_bloc} onClick={openContact} />}
          {homepage?.attributes?.radio_bloc && <RadioSection radio={homepage.attributes.radio_bloc} />}
          {homepage?.attributes?.emissions_bloc && <EmissionsSection emissionsInfo={homepage.attributes.emissions_bloc} emissions={emissions} />}
          {homepage?.attributes?.series_bloc && <SeriesSection seriesInfo={homepage.attributes.series_bloc} series={series} />}
          {homepage?.attributes?.equipe_bloc && <EquipeSection equipeInfo={homepage.attributes.equipe_bloc} equipe={equipe} />}
          {compagnons?.length > 0 && <CompagnonsSection compagnons={compagnons} />}
        </div>
      </div>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  try {
    const [articlesRes, slidesRes, categoriesRes, homepageRes, emissionsRes, seriesRes, equipesRes, compagnonsRes] = await Promise.all([
      fetchAPI('/articles', { populate: '*' }).catch(() => ({ data: [] })),
      fetchAPI('/articles', {
        pagination: {
          pageSize: 4
        },
        populate: '*',
        sort: 'publishedAt:DESC'
      }).catch(() => ({ data: [] })),
      fetchAPI('/podcast-types', { populate: '*' }).catch(() => ({ data: [] })),
      fetchAPI('/homepage', {
        populate: {
          hero: '*',
          seo: { populate: '*' },
          association_bloc: { populate: '*', liste: { populate: '*' } },
          'association_bloc.liste': { populate: '*' },
          radio_bloc: { populate: '*' },
          emissions_bloc: { populate: '*' },
          series_bloc: { populate: '*' },
          equipe_bloc: { populate: '*' }
        }
      }).catch(() => ({ data: { attributes: {} } })),
      fetchAPI('/emissions', { populate: '*' }).catch(() => ({ data: [] })),
      fetchAPI('/series', { populate: '*' }).catch(() => ({ data: [] })),
      fetchAPI('/equipes', { populate: '*' }).catch(() => ({ data: [] })),
      fetchAPI('/sponsors', { populate: '*' }).catch(() => ({ data: [] }))
    ]);

    return {
      props: {
        articles: articlesRes.data || [],
        slides: slidesRes.data || [],
        categories: categoriesRes.data || [],
        homepage: homepageRes.data || { attributes: {} },
        emissions: emissionsRes.data || [],
        series: seriesRes.data || [],
        equipe: equipesRes.data || [],
        compagnons: compagnonsRes.data || []
      },
      revalidate: 50
    };
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return {
      props: {
        articles: [],
        slides: [],
        categories: [],
        homepage: { attributes: {} },
        emissions: [],
        series: [],
        equipe: [],
        compagnons: []
      },
      revalidate: 50
    };
  }
}
