import { Modal } from "@mantine/core";

function MyModal({ children, open, size, zIndex }) {
  return (
    <Modal
      opened={open}
      closeOnClickOutside={false}
      withCloseButton={false}
      onClose={() => null}
      size={size || "auto"}
      centered
      overlayBlur={3}
      transitionDuration={300}
      zIndex={zIndex || 101}
    >
      {children}
    </Modal>
  );
}

export default MyModal;