import { Button, Select, FileInput } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { HiSelector } from "react-icons/hi"
import axios from "axios";
import { deleteObject } from "firebase/compat/storage";
import { uploadFirebase } from "../../lib/firebaseFunctions";
import { showError, showLoading, updateError, updateSuccess } from "../ui/alerts";
import { useUser } from '@auth0/nextjs-auth0/client'
import useTag from "./useTag";
import UploadTag from "./UploadTag";
import { BiTrash } from "react-icons/bi";

function AddTag({missingTags, toggleChange, close}) {

  const { user } = useUser()
  const ref = useRef(0)

  const [size, setSize] = useState(null)
  const pallet = size === "S" ? { width: 210, height: 210} : { width: 280, height: 210}
  const { image, setImage, dimensions, setLoaded, clear } = useTag(size, ref, pallet)

  async function submitTag() {
    if (!size) {
      showError("no-size", null, "No size selected!")
    } else 
    if (!image) {
      showError("no-tag", null, "No image!")
    } else {
    showLoading(size, null, `Uploading ${size} tag...`)
    try {
      const { name, url, ref } = await uploadFirebase(user, "tags", `${size}-Tag-${image.name}`, image)
      const design = {
        placement: "Neck",
        art_file: name,
        art_url: url,
        thumbnail_url: url,
        underbase: true,
        width: (dimensions.width / 70).toFixed(1), 
        height: (dimensions.height / 70).toFixed(1),
        x_offset: 0,
        y_offset: 0,
      }
      await postTag(design, ref)
      updateSuccess(size, null, `Uploaded ${size} tag!`)
      toggleChange()
      close()
    }
    catch (err) {
      updateError(size, `Server error: post ${size} tag`, "Contact us!")
    }}
  }

  async function postTag(design, ref) {
    try {
      const post = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tags`, {
        size: size, 
        pallet: size === "S" ? "Small" : "Standard",
        design: design
      })
      return(post)
    }
    catch {
      deleteObject(ref)
    }
  }

  return (
    <>
      <div className="flexbox-column-start full-width" style={{ maxWidth: 500, padding: 10, marginTop: 15 }} >
        <h1>Add Tag</h1>
        <h5 style={{ marginTop: 20}}>Size</h5>
        <Select
          value={size}
          onChange={(v) => setSize(v)}
          data={missingTags}
          style={{ width: 90}}
          icon={<HiSelector style={{ fill: "rgb(107, 116, 130)"}}/>}
          iconWidth={30}
        />
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
        <Button className="margin-left" style={{ marginTop: 10}} onClick={() => submitTag()}>SUBMIT</Button>
      </div>
    </>
  );
}

export default AddTag;