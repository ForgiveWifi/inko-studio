import { useState } from "react";
import { TextInput, ColorInput, Switch, Button, Collapse } from "@mantine/core";
import { HiCheck } from "react-icons/hi"
import axios from "axios";
import { showError, showLoading, updateError, updateSuccess } from "../../ui/alerts";
import ColorList from "./ColorList";
import ColorizeIcon from '@mui/icons-material/Colorize';
import MyModal from "../../ui/MyModal";
import CloseButton from "../../ui/CloseButton";
import useColors from "./useColors";
import EditColor from "./EditColor";
import useEdit from "../../ui/useEdit";
import useRefresh from "../../ui/useRefresh";
import AddButton from "../../ui/AddButton";

function Color() {

  const [open, setOpen] = useState(false)
  const [color, setColor] = useState("")
  const [hex, setHex] = useState("")
  const [dark, setDark] = useState(false)
  const { change, refresh } = useRefresh()
  const { colors } = useColors(change)
  const { edit, isEdit, openEdit, closeEdit } = useEdit()

  async function postColor() {
    if (!color || hex.length !== 7) {
      showError(!color ? "color" : "hex", null, `Missing color ${!color ? 'name' : 'hex'}!`)
      return
    }
    showLoading(color, null, `Adding: ${color}...`)
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/color`, {
        name: color,
        hex: hex,
        dark: !dark
      })
      refresh()
      setColor("")
      setHex("")
      setDark(false)
      updateSuccess(color, null, `Added: ${color}!`)
    }
    catch (err) {
      updateError(color, `Failed to add: ${color}`, "Contact us!")
    }
  }

  function formatColor(color) {
    setColor(color.replace(/\s/g, '_').replace(/[^a-zA-Z_]/g, '').toUpperCase())
  }

  return (
    <>
      <MyModal open={isEdit} size="sm">
        <CloseButton onClick={closeEdit} />
        <EditColor color={colors ? colors[edit] : null} refresh={refresh} close={closeEdit} />
      </MyModal>

      <div className="flexbox-column-start" style={{ maxWidth: 250 }}>
        <h2>Color</h2>
        <Collapse in={open}>
          <TextInput
            label="name"
            value={color}
            onChange={(event) => formatColor(event.currentTarget.value)}
            autoComplete="off"
            className="full-width"
          />
          <div style={{ fontSize: 14 }}> hex</div>
          <ColorInput
            value={hex}
            onChange={value => setHex(value.toUpperCase())}
            defaultValue="#FFFFFF"
            radius={8}
            autoComplete="off"
            eyeDropperIcon={
              <ColorizeIcon style={{ fontSize: 20, fill: "rgb(107, 116, 130)" }} />
            }
          />
          <div className="flexbox-row" style={{ gap: 10, margin: "15px 0px" }}>
            <div className="flexbox max-radius shadow2" style={{ backgroundColor: hex || "rgba(255,255,255,0.2)", border: `3px solid ${!dark ? "white" : "black"}`, width: 40, height: 40 }}>
              <HiCheck style={{ fontSize: 28, fill: !dark ? "white" : "black" }} />
            </div>
            <div className="flexbox radius10 shadow2" style={{ backgroundColor: hex || "rgba(255,255,255,0.2)", border: `3px solid ${!dark ? "white" : "black"}`, width: 160, height: 40 }}>
            </div>
          </div>
          <div className="flexbox-row" style={{ gap: 10, marginBottom: 15 }}>
            <h5>WHITE</h5>
            <Switch checked={dark} onChange={(event) => setDark(event.currentTarget.checked)} color="dark" />
            <h5>BLACK</h5>
          </div>
        </Collapse>
        <AddButton text="color" onClick={open ? () => postColor() : () => setOpen(true)} />
      </div>


      <ColorList colors={colors} openEdit={openEdit} />
    </>
  );
}

export default Color;