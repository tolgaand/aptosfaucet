import _Head from "next/head";

export const Head = () => {
  return (
    <_Head>
      <title>Aptos Faucet</title>
      <meta
        name="description"
        content="Send apt to your account on the devnet network."
      />
      <meta name="keywords" content="Aptos, Apt, Faucet" />
      <link rel="icon" href="/favicon.ico" />
    </_Head>
  );
};
