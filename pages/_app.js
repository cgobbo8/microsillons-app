import { Layout } from '../layouts/Layout'
import '../styles/globals.scss'
import App from "next/app";
import Head from "next/head";
import { createContext } from "react";
import { fetchAPI } from "../lib/api";
import { getStrapiMedia } from "../lib/media";
import { TransitionContext, TransitionContextProvider } from '../contexts/TransitionContext';
import { AnimatePresence } from 'framer-motion';

export const GlobalContext = createContext({});

function MyApp({ Component, pageProps }) {

  const { global, live } = pageProps;

  console.log(global);


  return (
    <AnimatePresence exitBeforeEnter>
      <>
        <Head>
          <link
            rel="shortcut icon"
            href={getStrapiMedia(global.attributes.favicon)}
          />
        </Head>

        <GlobalContext.Provider value={global.attributes} test='test'>
          <TransitionContextProvider>
            <Layout live={live}>
              <Component {...pageProps} />
            </Layout>
          </TransitionContextProvider>
        </GlobalContext.Provider>
      </>
    </AnimatePresence>
  )
}

MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
  // Fetch global site settings from Strapi
  const globalRes = await fetchAPI("/global", {
    populate: {
      favicon: "*",
      defaultSeo: {
        populate: "*",
      },
      head : {
        populate: "*",
      }
    },
  });

  const liveRes = await fetchAPI("/live", {
    populate: {
      live: "*",
    },
  });

  // Pass the data to our page via props
  return { ...appProps, pageProps: { global: globalRes.data, live : liveRes.data.attributes } };
};

export default MyApp
