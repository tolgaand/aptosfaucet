import { Button } from "@chakra-ui/react";
import { useSaveLog } from "hooks/useLogs";
import { useSendAptos } from "hooks/useSendAptos";
import { PropsWithChildren } from "react";

type SendButtonProps = {
  walletAddress: string;
  type: "devnet" | "testnet";
};

export const SendButton = (props: PropsWithChildren<SendButtonProps>) => {
  const { walletAddress, type } = props;

  const sendApt = useSendAptos(walletAddress, type);
  const { mutate: handleLog } = useSaveLog();

  const onSubmit = async () => {
    await sendApt.mutateAsync();
    handleLog(walletAddress);
  };

  return (
    <Button
      backgroundColor="rgb(6, 247, 247)"
      color="rgb(42, 49, 49)"
      _hover={{
        backgroundColor: "rgb(6, 247, 247)",
      }}
      onClick={onSubmit}
      flex="1"
      textTransform="uppercase"
      fontWeight="bold"
      isLoading={sendApt.isLoading}
      disabled={!walletAddress}
    >
      {props.children}
    </Button>
  );
};
