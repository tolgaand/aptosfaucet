import { Box, Highlight, Image, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { GithubIcon } from "./github-icon";
import { SendButton } from "./send-button";
import { useLogCount } from "hooks/use-logs";

import { NumberInputField, NumberInputRoot } from "./ui/number-input";

export const AptFaucet = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("1");

  const { data, isLoading } = useLogCount();

  // const toast = useToast();

  // const copyToClipboard = (val: string) => {
  //   navigator.clipboard.writeText(val);
  //   toast({
  //     title: "Copied",
  //     description: `${sanitizeAddress(val)} copied to clipboard`,
  //     status: "success",
  //     duration: 9000,
  //   });
  // };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      height="100vh"
      margin="auto"
      position="relative"
    >
      <Image src="/logo.png" height="150px" />
      <Text fontSize="2xl" marginTop="15px" fontWeight="500" color="#F17844">
        Quickly send a $APT to your wallet.
      </Text>
      <Text fontSize="1xl" color="#F17844" fontWeight="500">
        This tool does not send&nbsp;
        <Text as="span" fontWeight="bold">
          real $APT.
        </Text>
        &nbsp; It is a testnet or devnet faucet for the Aptos blockchain.
      </Text>
      <Text mt={2}>
        <Highlight
          query={(data?.logCount as number)?.toString() || "loading"}
          styles={{
            mt: "2",
            px: "1",
            py: "1",
            bg: "#F17844",
            fontWeight: "bold",
            color: "white",
            roundedBottomRight: "md",
            roundedTopLeft: "md",
          }}
        >
          {`Transaction count: ${data?.logCount || "loading"} `}
        </Highlight>
      </Text>

      <Stack marginTop="20px" maxWidth="2xl" width="100%">
        <Input
          variant="subtle"
          placeholder="0xc602a71f7067667cd80ac1d7913ee1ff4e3197e6a0a17c5810eb604a6531656a"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
        />
        <Stack direction="row">
          <SendButton type="devnet" walletAddress={walletAddress}>
            Send devnet
          </SendButton>
          <NumberInputRoot
            value={amount}
            onValueChange={(e: any) => setAmount(e.value)}
            maxW={20}
            defaultValue={1}
            min={1}
          >
            <NumberInputField />
          </NumberInputRoot>
          <SendButton type="testnet" walletAddress={walletAddress}>
            Send Testnet
          </SendButton>
        </Stack>
        <a
          href="https://github.com/tolgaand/aptosfaucet"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            margin: "auto",
          }}
        >
          <GithubIcon />
        </a>
      </Stack>

      {/* <Flex
        position="absolute"
        marginTop="10px"
        bottom="20px"
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Text
          fontSize="20px"
          cursor="pointer"
          onClick={() =>
            copyToClipboard(
              "0xc602a71f7067667cd80ac1d7913ee1ff4e3197e6a0a17c5810eb604a6531656a"
            )
          }
          color="orange.200"
          fontWeight="900"
        >
          With your 💰 donations, this 🔧 tool becomes even stronger. You can
          copy me 💰 wallet address by clicking 🔗 here. 🇹🇷
        </Text>
        <a
          href="https://github.com/tolgaand/aptosfaucet"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon />
        </a>
      </Flex> */}
    </Box>
  );
};
