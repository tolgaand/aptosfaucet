import { AptosClient, AptosAccount, CoinClient, FaucetClient } from "aptos";
import {
  Box,
  Button,
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

const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";

export const AptFaucet = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const sendApt = async () => {
    try {
      if (!walletAddress) return;

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
      maxW="2xl"
    >
      <Text fontSize="4xl">APT Faucet🚀</Text>
      <Text fontSize="15px">Send $APT to a wallet on the DEVNET network.</Text>
      <Stack marginTop="20px">
        <Input
          variant="filled"
          placeholder="0x..."
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
        />
        <Button
          backgroundColor="rgb(6, 247, 247)"
          color="rgb(42, 49, 49)"
          _hover={{
            backgroundColor: "rgb(6, 247, 247)",
          }}
          onClick={sendApt}
        >
          Send 1 APT!
        </Button>
      </Stack>

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
