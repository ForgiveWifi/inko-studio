import { ColorInput, Switch, TextInput } from "@mantine/core";
import { useState } from "react";
import ColorizeIcon from '@mui/icons-material/Colorize';
import EditButtons from "../../ui/EditButtons";
import { showError, showLoading, updateError, updateSuccess } from "../../ui/alerts";
import axios from "axios";
import DeleteModal from "../../ui/DeleteModal";
import useRemove from "../../ui/useRemove";
import { DeleteIcon, EditIcon, SaveIcon } from "../../ui/Icons";
import isEqual from "lodash.isequal";

function EditColor({ color, refresh, close }) {

  const [edit, setEdit] = useState(false)
  const [ref, setRef] = useState(color)
  const { id, name, hex, dark } = ref
  const { isRemove, openRemove, closeRemove } = useRemove()

  function handleRef(field, value) {
    setRef({ ...ref, [field]: value })
  }

  async function saveColor() {
    if (!name || hex.length !== 7) {
      showError("color-err", null, `Missing ${!name ? "name" : "hex"}!`)
      return
    }
    showLoading(id, null, `Saving: ${name}...`)
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/admin/color`, {
        color: color.id,
        name: name,
        hex: hex,
        dark: dark
      })
      refresh()
      setEdit(false)
      updateSuccess(id, null, `Saved: ${name}!`)
    }
    catch (err) {
      updateError(id, null, `Failed to save: ${name}`)
    }

  }
  async function deleteColor() {
    const { id, name } = color
    showLoading(id, null, `Deleting: ${name}...`)
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/admin/color`, { data: { color: id } })
      refresh()
      closeRemove()
      close()
      updateSuccess(id, null, `Deleted: ${name}!`)
    }
    catch (err) {
      updateError(id, null, `Failed to delete: ${name}`)
    }
  }
  if (!color) {
    return null
  }
  const same = color.name === name && color.hex === hex && color.dark === dark
  return (
    <>
      <DeleteModal text={color.name} open={isRemove} cancel={closeRemove} confirm={deleteColor} />
      <div style={{ marginTop: 20 }}>
        <div style={{ fontSize: 14 }}>name</div>
        <TextInput
          value={name}
          onChange={(event) => handleRef("name", event.currentTarget.value.replace(/\s/g, '_').replace(/[^a-zA-Z_]/g, '').toUpperCase())}
          autoComplete="off"
          disabled={!edit}
        />
        <ColorInput
          label="hex"
          value={hex}
          onChange={(value) => handleRef("hex", value.toUpperCase())}
          defaultValue="#FFFFFF"
          radius={8}
          autoComplete="off"
          eyeDropperIcon={
            <ColorizeIcon style={{ fontSize: 20, fill: "rgb(107, 116, 130)" }} />
          }
          disabled={!edit}
        />

        <div className="flexbox-row margin-auto" style={{ gap: 10, margin: "15px 0px" }}>
          <div className="flexbox max-radius shadow2" style={{ backgroundColor: hex || "rgba(255,255,255,0.2)", border: `3px solid ${dark ? "white" : "black"}`, width: 40, height: 40 }}>
          </div>
          <div className="flexbox radius10 shadow2" style={{ backgroundColor: hex || "rgba(255,255,255,0.2)", border: `3px solid ${dark ? "white" : "black"}`, width: 160, height: 40 }}>
          </div>
        </div>
        <div className="flexbox-row" style={{ gap: 10, marginBottom: 15 }}>
          <h5>WHITE</h5>
          <Switch checked={!dark} onChange={edit ? (event) => handleRef("dark", !event.currentTarget.checked) : null} color="dark" />
          <h5>BLACK</h5>
        </div>
        <div className="flexbox-row">

          <div>{edit ? <EditButtons cancel={() => setEdit(false)} edit={!isEqual(color, ref) ? () => saveColor() : () => setEdit(false)} /> : <EditIcon onClick={() => setEdit(true)} />}</div>
          {edit ? <DeleteIcon onClick={openRemove} /> : null}
        </div>

      </div>
    </>
  );
}

export default EditColor;