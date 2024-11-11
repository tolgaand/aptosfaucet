import { Container, Flex } from "@chakra-ui/react";
import { AptFaucet } from "../components/apt-faucet";
import { Head } from "../components/head";

export const DefaultContainer = () => {
  return (
    <>
      <Head />
      <Container maxW="100%">
        <Flex
          flexDirection={{
            base: "column",
            md: "row",
          }}
          alignItems="center"
        >
          <AptFaucet />
          {/* <TransferHistory /> */}
        </Flex>
      </Container>
    </>
  );
};
