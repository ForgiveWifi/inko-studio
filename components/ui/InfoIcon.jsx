import { Tooltip } from "@mantine/core";
import { HiInformationCircle } from "react-icons/hi"

function InfoIcon() {
  return (
    <>
      <Tooltip label="Contact us" position="right" withArrow>
        <div className="flexbox">
          <HiInformationCircle />
        </div>
      </Tooltip>
    </>
  );
}

export default InfoIcon;