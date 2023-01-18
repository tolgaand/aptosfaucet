import "../assets/styles/globals.css";
import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { GoogleAnalytics } from "nextjs-google-analytics";

import { QueryClient, QueryClientProvider } from "react-query";
const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <ChakraProvider theme={theme}>
        <GoogleAnalytics trackPageViews />

        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
