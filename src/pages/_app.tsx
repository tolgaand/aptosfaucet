import "../assets/styles/globals.css";
import type { AppProps } from "next/app";

import { Provider } from "../components/ui/provider";
import { Toaster } from "../components/ui/toaster";

import { GoogleAnalytics } from "nextjs-google-analytics";

import { QueryClient, QueryClientProvider } from "react-query";
const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <Provider>
        <GoogleAnalytics trackPageViews />

        <Component {...pageProps} />
        <Toaster />
      </Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
