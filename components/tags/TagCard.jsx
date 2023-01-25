import { Button } from "@mantine/core";
import { useState } from "react";
import DesignBox from "../products/DesignBox";
import HorzDivider from "../ui/HorzDivider";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TagDisplay from "./TagDisplay";
import Divider from "../ui/Divider";
import TagMenu from "./TagMenu";

function TagCard({tag, remove, edit}) {

  const {size, design, pallet} = tag

  return (
    <>
      <div className="flexbox-column background3 white-border radius10 full-width flex-wrap" style={{ padding: 10 }}>
       
        <div className="flexbox-row full-width">
          <div className="flexbox-row">
            <h3 style={{marginLeft: 8}}>{size}</h3>
            <Divider />
            <h5>{pallet}</h5>
          </div>
          <div className="margin-left">
            <TagMenu size={size} remove={remove} edit={edit}/>
          </div>
        </div> 
        <HorzDivider margin="10px 0px" />
        <TagDisplay design={design} />
      </div>
    </>
  );
}

export default TagCard;