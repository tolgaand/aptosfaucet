import { Container, Flex } from "@chakra-ui/react";
import { TransferHistory } from "components/History";
import { AptFaucet } from "../components/AptFaucet";
import { Head } from "../components/Head";

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
