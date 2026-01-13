import { Layout } from '../layouts/Layout'
import '../styles/globals.scss'
import '../styles/flickity.scss'
import App from "next/app";
import Head from "next/head";
import { createContext } from "react";
import { fetchAPI } from "../lib/api";
import { getStrapiMedia } from "../lib/media";
import { TransitionContext, TransitionContextProvider } from '../contexts/TransitionContext';
import { AnimatePresence } from 'framer-motion';
import { PodcastContextProvider } from '../contexts/PodcastContext';

export const GlobalContext = createContext({});

function MyApp({ Component, pageProps }) {

  const { global, live, planning, lastPodcast } = pageProps;


  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href={getStrapiMedia(global.attributes.favicon)}
        />
      </Head>


      <GlobalContext.Provider value={global.attributes} test='test'>
        <TransitionContextProvider>
          <PodcastContextProvider lastPodcast={lastPodcast}>
            <Layout live={live} planning={planning} global={global}>
              <Component {...pageProps} />
            </Layout>
          </PodcastContextProvider>
        </TransitionContextProvider>
      </GlobalContext.Provider>

    </>
  )
}

// Helper pour fetch avec gestion d'erreur
async function safeFetchAPI(path, params, defaultValue = null) {
  try {
    const res = await fetchAPI(path, params);
    return res;
  } catch (error) {
    console.error(`Failed to fetch ${path}:`, error.message);
    return { data: defaultValue };
  }
}

MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);

  // Fetch global site settings from Strapi
  const globalRes = await safeFetchAPI("/global", {
    populate: {
      favicon: "*",
      defaultSeo: {
        populate: "*",
      },
      head : {
        populate: "*",
      },
      contact : {
        populate: "*",
      },
      reseaux : {
        populate: "*",
      },
      financeurs : {
        populate: "*",
      }
    },
  }, { attributes: {} });

  const liveRes = await safeFetchAPI("/live", {
    populate: {
      live: "*",
    },
  }, { attributes: {} });

  const planningRes = await safeFetchAPI("/planning", {
    populate: {
      planning: "*",
    },
  });

  const lastPodcastRes = await safeFetchAPI("/podcasts", {
    populate: "*",
    pagination: {
      start: 0,
      limit: 1
    },
    sort: "publishedAt:DESC"
  }, []);

  // Pass the data to our page via props
  return {
    ...appProps,
    pageProps: {
      global: globalRes.data || { attributes: {} },
      live: liveRes.data?.attributes || {},
      planning: planningRes.data,
      lastPodcast: lastPodcastRes.data?.[0] || null
    }
  };
};

export default MyApp
