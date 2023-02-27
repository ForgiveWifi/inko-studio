import { Select } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { HiSelector } from "react-icons/hi"
import axios from "axios";
import { uploadFirebase, deleteRef } from "../../lib/firebaseFunctions";
import { showError, showLoading, updateError, updateSuccess } from "../ui/alerts";
import { useUser } from '@auth0/nextjs-auth0/client'
import useTag from "./useTag";
import UploadTag from "./UploadTag";
import AddButton from "../ui/AddButton"

function AddTag({ tags, refresh, close }) {

  const { user } = useUser()
  const ref = useRef(0)

  const [id, setID] = useState(null)
  const [pallet, setPallet] = useState({ width: 3, height: 3 })
  const { image, setImage, dimensions, setLoaded, clear } = useTag(id, ref, pallet)

  async function submitTag() {
    if (!id || !image) {
      showError(!id ? "id" : "image", null, `No ${!id ? "size" : "image"}!`)
      return
    }
    showLoading(id, null, `Uploading  tag...`)
    try {
      const size = pallet.size_id
      const { name, url, ref } = await uploadFirebase(user, `tags/${size}`, `${size}-Tag-${image.name}`, image)
      const design = {
        placement: "Neck",
        art_file: name,
        art_url: url,
        thumbnail_url: url,
        underbase: true,
        width: parseFloat((dimensions.width).toFixed(1)),
        height: parseFloat((dimensions.height).toFixed(1)),
        x_offset: 0,
        y_offset: 0,
      }
      console.log(design)
      await postTag(design, ref)
      refresh()
      close()
      updateSuccess(id, null, `Uploaded tag!`)
    }
    catch (err) {
      console.log(err)
      updateError(id, `Problem adding tag!`, "Contact us!")
    }
  }

  async function postTag(design, ref) {
    try {
      const post = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tag`, {
        tags: id,
        design: design
      })
      return (post)
    }
    catch (err) {
      deleteRef(ref)
      throw err
    }
  }

  function selectSize(size) {
    setID(size)
    setPallet(findPallet())
    function findPallet() {
      for (let i = 0; i < tags.length; i++) {
        if (tags[i].id === size) {
          const { pallet, size_id } = tags[i]
          const { width, height } = pallet;
          return { width, height, size_id };
        }
      }
    }
  }

  function formatTags(tags) {
    return (
      tags.map(tag => {
        const { id, size_id, pallet } = tag
        return ({
          label: size_id,
          value: id,
          group: `${pallet.width} x ${pallet.height}`
        })
      })
    )
  }
  console.log("change")

  return (
    <>
      <div className="flexbox-column full-width" style={{ padding: 10, marginTop: 15 }} >
        <div className="flexbox-column-start full-width">
          <h2>New Tag</h2>
          <Select
            label="sizes"
            value={id}
            onChange={selectSize}
            data={tags ? formatTags(tags) : []}
            style={{ width: 100 }}
            icon={<HiSelector style={{ fill: "rgb(107, 116, 130)" }} />}
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
                  style={dimensions?.width ? { width: dimensions.width * 70, height: dimensions.height * 70 } : { display: "none" }}
                  draggable={false} /> : null
            }
          </UploadTag>
        </div>

        <div className="margin-left" style={{ marginTop: 20 }}>
          <AddButton text="TAG" onClick={submitTag} />
        </div>

      </div>
    </>
  );
}

export default AddTag;