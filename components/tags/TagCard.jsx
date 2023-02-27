import { Button } from "@mantine/core";
import { useState } from "react";
import DesignBox from "../products/DesignBox";
import HorzDivider from "../ui/HorzDivider";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TagDisplay from "./TagDisplay";
import Divider from "../ui/Divider";
import TagMenu from "./TagMenu";
import PalletDimensions from "../ui/PalletDimensions";

function TagCard({ tag, openEdit, openRemove }) {
  if (!tag) {
    return null
  }

  const { design, tags } = tag
  const { size_id, pallet } = tags

  return (
    <>
      <div className="flexbox-column background3 white-border radius10 full-width flex-wrap" style={{ padding: 10 }}>
        <div className="flexbox-row full-width">
          <div className="flexbox-row">
            <h3 style={{ marginLeft: 8 }}>{size_id}</h3>
            <Divider />
            <PalletDimensions pallet={pallet} />
          </div>
          <div className="margin-left">
            <TagMenu remove={openRemove} edit={openEdit} />
          </div>
        </div>
        <HorzDivider margin="10px 0px" />
        <TagDisplay design={design} />
      </div>
    </>
  );
}

export default TagCard;