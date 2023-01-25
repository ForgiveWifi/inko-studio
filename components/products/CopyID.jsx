import { CopyButton, ActionIcon, Tooltip } from '@mantine/core';
import {HiOutlineClipboardCopy} from "react-icons/hi"
import { FaCheck } from "react-icons/fa"

function CopyID({text, value}) {
  return (
    <CopyButton value={value} timeout={1500}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : 'Copy ID'} withArrow position="right">
          <ActionIcon className='background1' variant="transparent" onClick={copy}>
            {copied ? <FaCheck style={{ fontSize: 12}} /> : <HiOutlineClipboardCopy/>}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
}

export default CopyID;