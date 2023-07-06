import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import { Provider } from "react-redux";
import { SessionProvider, useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify"; //styles of nprogress
import "@/styles/globals.css";

import "nprogress/nprogress.css";
import { SWRConfig } from "swr";
import fetcher from "../util/fetch";
import { store } from "@/slices/store";
import Layout from "@/components/Layout/Layout";

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <SWRConfig
        value={{
          refreshInterval: 1000,
          fetcher,
        }}
      >
        <Provider store={store}>
          <Layout admin={Component?.admin} auth={Component?.auth}>
            <Component {...pageProps} />
            <ToastContainer limit={4} />
          </Layout>
        </Provider>
      </SWRConfig>
    </SessionProvider>

    //   <NextAuthProvider session={pageProps.session}>
    //   <SWRConfig
    //     value={{
    //       refreshInterval: 1000,
    //       fetcher,
    //     }}
    //   >
    //     <Provider store={store}>
    //       <Layout admin={Component?.admin} auth={Component?.auth}>
    //         <Component {...pageProps} />
    //         <ToastContainer limit={4} />
    //       </Layout>
    //     </Provider>
    //   </SWRConfig>
    // </NextAuthProvider>
  );
}
