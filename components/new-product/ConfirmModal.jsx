import { Modal, Stepper, Button } from '@mantine/core';
import html2canvas from 'html2canvas';
import { useEffect } from 'react';
import DesignPreview from './DesignPreview';

function ConfirmModal({openConfirm, close, details, attributes, sizes}) {

  function takeScreenshot() {
    html2canvas(document.getElementById("front-preview"))
      .then((canvas) => {
        canvas.toDataURL()
        document.getElementById('output').appendChild(canvas);
      })
    html2canvas(document.getElementById("back-preview"))
    .then((canvas) => {
      canvas.toDataURL()
      document.getElementById('output').appendChild(canvas);
    })
  }

  takeScreenshot()

  return (
    <>
      <Modal
          opened={openConfirm}
          onClose={close}
          overflow="outside"
          withCloseButton={false}
          centered
          size="xlg"
        >
          <Stepper style={{ width: 500}}color="orange" size="md" active={1}>
            <Stepper.Step label="Step 1" description="Verify Design" color="orange"/>
            <Stepper.Step label="Step 2" description="Upload" />
          </Stepper>
          <div id="output"></div>
          <DesignPreview  details={details} attributes={attributes} sizes={sizes}/>
        </Modal>
    </>
  );
}

export default ConfirmModal;