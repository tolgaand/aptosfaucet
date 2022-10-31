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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { GithubIcon } from "./GithubIcon";

const NODE_URL_DEVNET = "https://fullnode.devnet.aptoslabs.com/v1";
const FAUCET_URL_DEVNET = "https://faucet.devnet.aptoslabs.com";

const NODE_URL_TESTNET = "https://fullnode.testnet.aptoslabs.com/v1";
const FAUCET_URL_TESTNET = "https://faucet.testnet.aptoslabs.com";

const sanitizeAddress = (address: string) => {
  return address.slice(0, 4) + "..." + address.slice(-4);
};

export const AptFaucet = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("1");

  //loading
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const sendApt = async (type: "devnet" | "testnet") => {
    if (!walletAddress) return;

    try {
      setLoading(true);
      const NODE_URL = type === "devnet" ? NODE_URL_DEVNET : NODE_URL_TESTNET;
      const FAUCET_URL =
        type === "devnet" ? FAUCET_URL_DEVNET : FAUCET_URL_TESTNET;

      const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);

      await faucetClient.fundAccount(walletAddress, 1e9 * Number(amount));

      toast({
        title: "Success",
        description: `${amount} APT sent to ${sanitizeAddress(walletAddress)}`,
        status: "success",
        duration: 9000,
      });
    } catch (e: any) {
      toast({
        title: "Error",
        description: JSON.stringify(e.message, null, 2),
        status: "error",
        duration: 9000,
      });
    } finally {
      setLoading(false);
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
            isLoading={loading}
          >
            Send Devnet
          </Button>
          <NumberInput maxW={20} defaultValue={1} min={1}>
            <NumberInputField
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
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
            isLoading={loading}
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
    </Box>
  );
};
