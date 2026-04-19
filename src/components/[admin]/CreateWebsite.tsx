"use client";

import { Button, Modal, Surface } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Step, useCreateWebsiteStore } from "@/hooks/useCreateWebisteStore";
import CreateWebsiteForm from "./CreateWebsiteForm";
import UploadImageForm from "./UploadImageForm";

export default function CreateWebsite() {
  const step = useCreateWebsiteStore((state) => state.step);
  const isOpen = useCreateWebsiteStore((state) => state.isOpen);
  const setOpen = useCreateWebsiteStore((state) => state.setOpen);

  return (
    <>
      <Button onPress={setOpen}>
        <Icon icon="hugeicons:add-01" />
        Add website
      </Button>
      <Modal.Backdrop isOpen={isOpen} onOpenChange={setOpen} isDismissable>
        <Modal.Container placement="auto" size="lg">
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Create Website</Modal.Heading>
              <p>Fill the basic info of the website.</p>
            </Modal.Header>
            <Modal.Body className="px-1 py-6">
              <Surface variant="transparent">{renderStep(step)}</Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </>
  );
}

const renderStep = (step: Step) => {
  switch (step) {
    case "details":
      return <CreateWebsiteForm />;
    case "image":
      return <UploadImageForm />;
  }
};
