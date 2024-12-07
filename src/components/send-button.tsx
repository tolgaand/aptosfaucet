import { useSaveLog } from "hooks/use-logs";
import { useSendAptos } from "hooks/use-send-aptos";
import { PropsWithChildren } from "react";
import { Button } from "./ui/button";
import { useDisclosure } from "@chakra-ui/react";
import { ThanksDialog } from "./thanks-dialog";
import { Network } from "@aptos-labs/ts-sdk";

type SendButtonProps = {
  walletAddress: string;
  network: Network;
};

export const SendButton = (props: PropsWithChildren<SendButtonProps>) => {
  const { walletAddress, network } = props;
  const { onOpen, onClose, open } = useDisclosure();

  const sendApt = useSendAptos(walletAddress, network);
  const { mutate: handleLog } = useSaveLog();

  const onSubmit = async () => {
    await sendApt.mutateAsync();
    handleLog(walletAddress);
    onOpen();
  };

  return (
    <>
      <Button
        onClick={onSubmit}
        flex="1"
        textTransform="uppercase"
        fontWeight="bold"
        loading={sendApt.isLoading}
        disabled={!walletAddress}
      >
        {props.children}
      </Button>
      <ThanksDialog isOpen={open} onClose={onClose} />
    </>
  );
};
