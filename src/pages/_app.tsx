import "../assets/styles/globals.css";
import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { GoogleAnalytics } from "nextjs-google-analytics";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <GoogleAnalytics trackPageViews />

      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
