"use client";

import { Fragment } from "react";
import { Button, Modal, Surface } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useCreateWebsiteModalStore } from "@/hooks/useCreateWebsiteModalStore";
import CreateWebsiteForm from "./CreateWebsiteForm";
import UploadAssetsForm from "./UploadAssetsForm";

export default function CreateWebsite() {
  const isOpen = useCreateWebsiteModalStore((s) => s.isOpen);
  const setIsOpen = useCreateWebsiteModalStore((s) => s.setOpen);
  const stage = useCreateWebsiteModalStore((s) => s.stage);
  const setStage = useCreateWebsiteModalStore((s) => s.setStage);
  const setWebsiteId = useCreateWebsiteModalStore((s) => s.setWebsiteId);

  return (
    <Fragment>
      <Button onPress={setIsOpen}>
        <Icon icon="hugeicons:add-01" />
        Add website
      </Button>
      <Modal.Backdrop
        isOpen={isOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setStage("basic");
            setWebsiteId(null);
            setIsOpen();
          }
        }}
      >
        <Modal.Container placement="auto" size="lg">
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Create Website</Modal.Heading>
              <p>Fill the basic info of the website</p>
            </Modal.Header>
            <Modal.Body className="px-1 py-6">
              <Surface variant="transparent">{renderStage(stage)}</Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Fragment>
  );
}

const renderStage = (stage: "basic" | "assets") => {
  switch (stage) {
    case "basic":
      return <CreateWebsiteForm />;
    case "assets":
      return <UploadAssetsForm />;
    default:
      return null;
  }
};
