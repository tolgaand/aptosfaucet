import { FaucetClient } from "aptos";
import {
  Box,
  Button,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { GithubIcon } from "./GithubIcon";

const NODE_URL_DEVNET = "https://fullnode.devnet.aptoslabs.com/v1";
const FAUCET_URL_DEVNET = "https://faucet.devnet.aptoslabs.com";

const NODE_URL_TESTNET = "https://fullnode.testnet.aptoslabs.com/v1";
const FAUCET_URL_TESTNET = "https://faucet.testnet.aptoslabs.com";

export const AptFaucet = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const sendApt = async (type: "devnet" | "testnet") => {
    if (!walletAddress) return;

    try {
      const NODE_URL = type === "devnet" ? NODE_URL_DEVNET : NODE_URL_TESTNET;
      const FAUCET_URL =
        type === "devnet" ? FAUCET_URL_DEVNET : FAUCET_URL_TESTNET;

      const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);

      await faucetClient.fundAccount(walletAddress, 100_000_000);
      setModalTitle("Success");
      setModalMessage("Aptos sent to your wallet!");
    } catch (error) {
      console.log(error);
      setModalTitle("Error");
      setModalMessage(JSON.stringify(error));
    } finally {
      setShowModal(true);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      margin="auto"
      maxW="5xl"
    >
      <Image src="/logo.png" height="150px" />
      <Text fontSize="1xl" marginTop="15px" fontWeight="bold" color="#F17844">
        Quickly send a $APT to your wallet.
      </Text>
      <Stack marginTop="20px" maxWidth="2xl" width="100%">
        <Input
          variant="filled"
          placeholder="0x..."
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
        />
        <Stack direction="row">
          <Button
            backgroundColor="rgb(6, 247, 247)"
            color="rgb(42, 49, 49)"
            _hover={{
              backgroundColor: "rgb(6, 247, 247)",
            }}
            onClick={() => sendApt("devnet")}
            flex="1"
            textTransform="uppercase"
            fontWeight="bold"
          >
            Send Devnet
          </Button>
          <Button
            backgroundColor="rgb(6, 247, 247)"
            color="rgb(42, 49, 49)"
            _hover={{
              backgroundColor: "rgb(6, 247, 247)",
            }}
            onClick={() => sendApt("testnet")}
            flex="1"
            textTransform="uppercase"
            fontWeight="bold"
          >
            Send Testnet
          </Button>
        </Stack>
      </Stack>

      <Box marginTop="10px">
        <a
          href="https://github.com/tolgaand/aptosfaucet"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon />
        </a>
      </Box>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalMessage}</ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
