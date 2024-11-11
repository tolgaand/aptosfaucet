import { Link, LinkBox } from "@chakra-ui/react";
import { GithubIcon } from "./github-icon";
import { Button } from "./ui/button";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
} from "./ui/dialog";
import { LinkButton } from "./ui/link-button";

type ThanksDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ThanksDialog = (props: ThanksDialogProps) => {
  const { isOpen, onClose } = props;

  return (
    <DialogRoot
      placement="center"
      motionPreset="slide-in-bottom"
      open={isOpen}
      onOpenChange={(e: any) => onClose()}
    >
      <DialogContent>
        <DialogHeader>
          <DialogCloseTrigger onClose={onClose} />
        </DialogHeader>
        <DialogBody>
          <p>
            Does it help?
            <br /> Then leave a ⭐ on GitHub! 👇
          </p>
          <LinkButton
            colorPalette="green"
            w="full"
            mt="10px"
            href="https://github.com/tolgaand/aptosfaucet"
          >
            <GithubIcon /> Github
          </LinkButton>
        </DialogBody>
        <DialogFooter />
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
