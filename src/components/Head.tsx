import _Head from "next/head";

export const Head = () => {
  return (
    <_Head>
      <title>Aptos Faucet</title>
      <meta
        name="description"
        content="Send apt to a wallet quickly and securely on the devnet or testnet network."
      />
      <meta
        name="keywords"
        content="Aptos, Apt, Faucet, Aptos faucet, aptos faucet devnet, aptos faucet testnet"
      />
      <link rel="icon" href="/favicon.ico" />
    </_Head>
  );
};
