import { Container } from "@chakra-ui/react";
import { AptFaucet } from "../components/AptFaucet";
import { Head } from "../components/Head";

export const DefaultContainer = () => {
  return (
    <>
      <Head />
      <Container>
        <AptFaucet />
      </Container>
    </>
  );
};
