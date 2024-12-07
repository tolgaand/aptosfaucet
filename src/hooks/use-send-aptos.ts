import { toaster } from "../components/ui/toaster";

import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { sanitizeAddress } from "lib/sanitizeAddress";
import { useMutation } from "react-query";

export const useSendAptos = (walletAddress: string, network: Network) => {
  return useMutation(
    ["sendAptos", walletAddress, network],
    async () => {
      const config = new AptosConfig({ network });
      const aptos = new Aptos(config);

      return await aptos.fundAccount({
        accountAddress: walletAddress,
        amount: 1e9 * Number(1),
        options: {},
      });
    },
    {
      onSuccess: () => {
        toaster.create({
          title: "Success",
          description: `APT sent to ${sanitizeAddress(walletAddress)}`,
          type: "success",
          duration: 9000,
        });
      },
      onError: (error: any) => {
        toaster.create({
          title: "Error",
          description: JSON.stringify(error.message, null, 2),
          type: "error",
          duration: 9000,
        });
      },
    }
  );
};
