import { Button, Collapse, TextInput } from "@mantine/core";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { showError, showLoading, updateError, updateSuccess } from "../../ui/alerts";
import axios from "axios";
import StyleList from "./StyleList";
import useStyles from "./useStyles";
import MyModal from "../../ui/MyModal";
import useEdit from "../../ui/useEdit";
import EditStyle from "./EditStyle";
import useRefresh from "../../ui/useRefresh";
import StyleInput from "./StyleInput";
import AddButton from "../../ui/AddButton";
import { deleteRef, uploadFirebase } from "../../../lib/firebaseFunctions";

function Style() {

  const [open, setOpen] = useState(false)
  const blank = { sku: "", name: "", description: "", brand: "", type: "", front_offset: 0, back_offset: 0 }
  const [style, setStyle] = useState(blank)
  const { sku, name, brand, type, width, height, front_image, back_image } = style
  const { change, refresh } = useRefresh()
  const { styles, setStyles } = useStyles(change)

  const { edit, isEdit, openEdit, closeEdit } = useEdit()

  function handleStyle(field, value) {
    setStyle({ ...style, [field]: value })
  }

  async function postStyle() {
    let front_ref = null
    let back_ref = null
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
    if (!front_image || !back_image) {
      showError(!front_image ? "front" : "back", null, `Missing ${!front_image ? "front preview" : "back preview"}!`)
      return
    }
    showLoading(sku, null, `Adding style: ${sku}...`)
    try {
      const front_preview = await uploadFirebase({ email: "inko-studios" }, `sku/${sku}`, `${sku}-front`, front_image)
      front_ref = front_preview.ref
      const back_preview = await uploadFirebase({ email: "inko-studios" }, `sku/${sku}`, `${sku}-back`, back_image)
      back_ref = back_preview.ref
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/style`, {
        ...style,
        front_image: front_preview.url,
        back_image: back_preview.url
      })
      refresh()
      setStyle(blank)
      updateSuccess(sku, null, `Added: ${sku}!`)
    }
    catch (err) {
      if (front_ref) {
        deleteRef(front_ref)
      }
      if (back_ref) {
        deleteRef(back_ref)
      }
      updateError(sku, `Failed to add: ${sku}!`, "Contact us!")
    }
  }

  return (
    <>
      <MyModal open={isEdit} size="sm">
        <EditStyle style={styles ? styles[edit] : null} refresh={refresh} close={closeEdit} />
      </MyModal>
      <div style={{ maxWidth: 350 }}>
        <h2>Style</h2>
        <Collapse in={open}>
          <TextInput
            label="sku"
            value={sku}
            onChange={(event) => handleStyle("sku", event.currentTarget.value)}
            autoComplete="off"
          />
          <div style={{ marginBottom: 15 }}>
            <StyleInput style={style} handleState={handleStyle} isEdit={true} />
          </div>
        </Collapse>
        <AddButton text="style" onClick={open ? () => postStyle() : () => setOpen(true)} />
      </div>
      <StyleList styles={styles} openEdit={openEdit} />
    </>
  );
}

export default Style;