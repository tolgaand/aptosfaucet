import {
  SystemContext,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";

// const config = defineConfig({
//   cssVarsPrefix: "ck",
// })

const system = createSystem(defaultConfig, {
  theme: {
    // dark
    tokens: {
      fonts: {
        body: { value: `Rajdhani, sans-serif` },
      },
    },
  },
  // config,
  // styles: {
  //   global: (props: any) => ({
  //     body: {
  //       bg: "rgb(18,22,22)",
  //     },
  //   }),
  // },
  // fonts: {
  //   body: `Rajdhani, sans-serif`,
  // },
});

export default system;
