import { useUser } from '@auth0/nextjs-auth0/client'
import axios from "axios";
import { showError, showLoading, updateError, updateSuccess } from "../ui/alerts";
import { deleteFirebase, deleteRef, uploadFirebase } from "../../lib/firebaseFunctions"
import HorzDivider from "../ui/HorzDivider";
import { useRef, useState, useEffect } from 'react';
import UploadTag from './UploadTag';
import useTag from './useTag';
import { Button, FileInput } from '@mantine/core';
import { BiTrash } from 'react-icons/bi';
import Divider from '../ui/Divider';
import EditButtons from '../ui/EditButtons';
import PalletDimensions from '../ui/PalletDimensions';

function EditTag({ tag, closeEdit, refresh }) {
  if (!tag) {
    return null
  }
  const { user } = useUser()
  const ref = useRef(0)

  const { id, tags, design } = tag
  const { size_id, pallet } = tags
  const { image, setImage, dimensions, setLoaded, clear } = useTag(null, ref, pallet, design.art_url)


  async function editTag() {
    let ref = null
    try {
      if (!image) {
        showError("no-image", null, "No image!")
        return null
      }
      showLoading(id, null, `Editing tag: ${size_id}...`)
      const img = await uploadFirebase(user, `tags/${size_id}`, `${size_id}-Tag-${image.name}`, image)
      const { name, url } = img
      ref = img.ref
      const design = {
        placement: "Neck",
        art_file: name,
        art_url: url,
        thumbnail_url: url,
        width: parseFloat((dimensions.width).toFixed(1)),
        height: parseFloat((dimensions.height).toFixed(1)),
        x_offset: 0,
        y_offset: 0
      }
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/tag/${id}`, { design: design })
      await deleteFirebase(user, `tags/${size_id}`, tag.design.art_file)
      refresh()
      closeEdit()
      updateSuccess(id, null, `Edited tag: ${size_id}!`)
    }
    catch (err) {
      if (ref) {
        deleteRef(ref)
      }
      console.log(err)
      updateError(id, `Problem editing tag: ${size_id}`, "Contact us!")
    }
  }

  return (
    <>
      <div className="flexbox-column-start" style={{ padding: 10 }}>
        <h2>{`Edit Tag`}</h2>
        <div style={{ fontSize: 14, marginTop: 10 }}>size</div>
        <div className='flexbox-row' style={{ marginLeft: 4 }}>
          <h3>{size_id}</h3>
          <Divider />
          <PalletDimensions pallet={pallet} />
        </div>
        <UploadTag image={image} setImage={setImage} pallet={pallet} clear={clear}>
          {
            image ?
              <img
                ref={ref}
                onLoad={() => setLoaded(true)}
                src={image instanceof File ? URL.createObjectURL(image) : image}
                alt={image.name}
                style={dimensions?.width ? { width: dimensions.width * 70, height: dimensions.height * 70 } : { display: "none" }}
                draggable={false} /> : null
          }
        </UploadTag>
        <div className='margin-left' style={{ marginTop: 15 }}>
          <EditButtons cancel={closeEdit} edit={image !== design.art_url ? () => editTag() : () => closeEdit()} />
        </div>
      </div>
    </>
  );
}

export default EditTag;