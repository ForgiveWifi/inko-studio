import { useState } from "react";
import CloseButton from "../../ui/CloseButton";
import DeleteModal from "../../ui/DeleteModal";
import EditButtons from "../../ui/EditButtons";
import useRemove from "../../ui/useRemove";
import { showLoading, updateSuccess, updateError, showError } from "../../ui/alerts"
import axios from "axios";
import StyleInput from "./StyleInput";
import isEqual from 'lodash.isequal'
import { DeleteIcon, EditIcon } from "../../ui/Icons";
import { deleteFirebase, deleteRef, uploadFirebase } from "../../../lib/firebaseFunctions";
import useEdit from "../../ui/useEdit";
import ImageCarousel from "../../ui/ImageCarousel";


function EditStyle({ style, refresh, close }) {

  const [ref, setRef] = useState(style)
  const { sku, name, brand, type, width, height, scale, front_image, back_image } = ref
  const { isEdit, openEdit, closeEdit } = useEdit()
  const { isRemove, openRemove, closeRemove } = useRemove()

  function handleRef(field, value) {
    setRef({ ...ref, [field]: value })
  }

  async function saveStyle() {
    if (!sku || !name) {
      showError(!sku ? "sku" : "name", null, `Missing ${!sku ? "SKU" : "name"}!`)
      return
    }
    if (!brand || !type) {
      showError(!brand ? "brand" : "type", null, `Missing ${!brand ? "brand" : "type"}!`)
      return
    }
    if (!width || !height) {
      showError(!width ? "width" : "height", null, `Missing ${!width ? "width" : "height"}!`)
      return
    }
    if (!scale) {
      showError("scale", null, `Missing scale!`)
      return
    }
    if (!front_image || !back_image) {
      showError(!front_image ? "front" : "back", null, `Missing ${!front_image ? "front preview" : "back preview"}!`)
      return
    }
    showLoading(sku, null, `Saving: ${sku}...`)
    let front_preview = null
    let back_preview = null
    try {
      if (front_image instanceof File) {
        const front = await uploadFirebase({ email: "inko-studios" }, `sku/${sku}`, `${sku}-front`, front_image)
        front_preview = front
      }
      if (back_image instanceof File) {
        const back = await uploadFirebase({ email: "inko-studios" }, `sku/${sku}`, `${sku}-back`, back_image)
        back_preview = back
      }
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/admin/style/${sku}`, {
        ...ref,
        front_image: front_preview ? front_preview.url : style.front_image,
        back_image: back_preview ? back_preview.url : style.back_image
      })
      if (front_preview) {
        deleteFirebase({ email: "inko-studios" }, `sku/${sku}`, style.front_image.split("%2F").pop().split("?")[0])
      }
      if (back_preview) {
        deleteFirebase({ email: "inko-studios" }, `sku/${sku}`, style.back_image.split("%2F").pop().split("?")[0])
      }
      refresh()
      closeEdit()
      updateSuccess(sku, null, `Saved: ${sku}!`)
    }
    catch (err) {
      if (front_preview) {
        deleteRef(front_preview.ref)
      }
      if (back_preview) {
        deleteRef(back_preview.ref)
      }
      updateError(sku, null, `Failed to save: ${sku}!`)
    }
  }

  async function deleteStyle() {
    const { sku, front_image, back_image } = style
    showLoading(sku, null, `Deleting: ${sku}...`)
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/admin/style/${sku}`)
      await deleteFirebase({ email: "inko-studios" }, `sku/${sku}`, front_image.split("%2F").pop().split("?")[0])
      await deleteFirebase({ email: "inko-studios" }, `sku/${sku}`, back_image.split("%2F").pop().split("?")[0])
      refresh()
      closeRemove()
      close()
      updateSuccess(sku, null, `Deleted: ${sku}!`)
    }
    catch (err) {
      updateError(sku, null, `Failed to delete: ${sku}`)
    }
  }

  function reset() {
    setRef(style)
    closeEdit()
  }

  return (
    <>
      <DeleteModal text={style.sku} open={isRemove} cancel={closeRemove} confirm={deleteStyle} />
      <div className="flexbox-column-start" style={{ margin: 5 }}>
        <CloseButton onClick={close} />
        <h2>{style.sku}</h2>
        {/* <div className="flexbox relative full-width" style={{ paddingBottom: "100%", top: 0 }}> */}
        {/* <img src={style.front_image} className="absolute full-width radius10" style={{ top: 0, zIndex: 1, objectFit: 'contain' }} />
          <div className="absolute radius10 full-width" style={{ backgroundColor: "white", width: "100%", height: "100%", top: 0 }}></div> */}
        <ImageCarousel images={[style.front_image, style.back_image]} color="white" />
        {/* </div> */}
        <StyleInput style={ref} handleState={handleRef} isEdit={isEdit} />

        <div className="flexbox-row full-width" style={{ marginTop: 15 }}>
          {
            isEdit ?
              <div className="flexbox-row full-width">
                <EditButtons cancel={reset} edit={isEqual(style, ref) ? () => closeEdit() : () => saveStyle()} />
                <DeleteIcon onClick={openRemove} />
              </div> :
              <div>
                <EditIcon onClick={openEdit} />
              </div>
          }
        </div>

      </div>
    </>
  );
}

export default EditStyle;