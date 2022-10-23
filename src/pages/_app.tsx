import "../assets/styles/globals.css";
import type { AppProps } from "next/app";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
