import { useUser } from '@auth0/nextjs-auth0/client'
import axios from "axios";
import { showError, showLoading, updateError, updateSuccess } from "../ui/alerts";
import { deleteFirebase, uploadFirebase } from "../../lib/firebaseFunctions"
import HorzDivider from "../ui/HorzDivider";
import { useRef, useState, useEffect } from 'react';
import UploadTag from './UploadTag';
import useTag from './useTag';
import { Button, FileInput } from '@mantine/core';
import { BiTrash } from 'react-icons/bi';
import { ImageUpload } from '../new-product/ImageUpload';
import UpdateButtons from '../ui/EditButtons';

function EditTag({tag, close, toggleChange}) {

  const { user } = useUser()
  const ref = useRef(0)
  const size = tag?.size
  const pallet = size === "S" ? { width: 210, height: 210} : { width: 280, height: 210}
  const { image, setImage, dimensions, setLoaded, clear } = useTag(size, ref, pallet)

  async function editTag() {
    try {
      if (!image) {
        showError("no-image", null, "No image!")
        return null
      }
      showLoading(size, null, `Editing ${tag.size} tag...`)
      const { name, url } = await uploadFirebase(user, "tags", `${tag.size}-Tag-${image.name}`, image)
      
      const design = {
          placement: "Neck",
          art_file: name,
          art_url: url,
          thumbnail_url: url,
          width: (dimensions.width / 70).toFixed(1),
          height: (dimensions.height / 70).toFixed(1), 
          x_offset: 0,
          y_offset: 0
        }
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/tags/${size}`, design)
      await deleteFirebase(user, "tags", tag.design.art_file)
      close()
      updateSuccess(size, null, `Edited ${size} tag!`)
      toggleChange()
    }
    catch (err) {
      updateError(size, `Server error: edit ${size} tag`, "Contact Us!")
    }
  }

  if (!tag) {
    return null
  }
  return (
    <>
      <div className="flexbox-column-start" style={{ padding: 10 }}>
        <h2>{`Edit Tag`}</h2>
        <h5 style={{ marginTop: 10}}>Size</h5>
        <div>{size}</div>
        <UploadTag image={image} setImage={setImage} pallet={pallet} clear={clear}>
          {
            image ?
            <img 
              ref={ref} 
              onLoad={() => setLoaded(true)}
              src={URL.createObjectURL(image)} 
              alt={image.name}
              style={dimensions?.width ? { width: dimensions.width, height: dimensions.height} : { display: "none"} } 
              draggable={false}/> : null
          }
        </UploadTag>
        <UpdateButtons cancel={close} update={editTag} />
      </div> 
    </>
  );
}

export default EditTag;