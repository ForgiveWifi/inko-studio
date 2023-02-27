import { useState } from "react";
import { Button, Collapse, SegmentedControl, Select, TextInput } from "@mantine/core";
import AddIcon from '@mui/icons-material/Add';
import { showError, showLoading, updateError, updateSuccess } from "../../ui/alerts";
import axios from "axios";
import PalletList from "./PalletList";
import usePallets from "./usePallets";
import DeleteModal from "../../ui/DeleteModal";
import useRefresh from "../../ui/useRefresh";
import useRemove from "../../ui/useRemove";
import Dimensions from "./Dimensions";
import AddButton from "../../ui/AddButton";
import usePrinters from "../printer/usePrinters"
import { formatPrinters } from "../format";

function Pallet() {

  const [open, setOpen] = useState(null)
  const blank = { printer: null, name: "", type: "garment" }
  const [pallet, setPallet] = useState(blank)
  const { name, printer, type, width, height } = pallet
  const { remove, isRemove, openRemove, closeRemove } = useRemove()
  const { change, refresh } = useRefresh()
  const { pallets } = usePallets(change)
  const { printers } = usePrinters()

  function handlePallet(field, value) {
    setPallet({ ...pallet, [field]: value })
  }
  async function postPallet() {
    if (!printer || !name) {
      showError(!printer ? "printer" : "name", null, `Missing ${!printer ? "printer" : "pallet name"}!`)
      return
    }
    if (!width || !height) {
      showError(!width ? "width" : "height", null, `Missing ${!width ? "width" : "height"}!`)
      return
    }
    showLoading(name, null, `Adding: ${name}...`)
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/pallet`, pallet)
      updateSuccess(name, null, `Added: ${name}!`)
      setPallet({
        ...blank,
        type: type
      })
      refresh()
    }
    catch (err) {
      updateError(name, null, `Failed to add: ${name}!`)
    }
  }

  async function deletePallet() {
    const { id, name } = remove
    showLoading(id, null, `Deleting: ${name}...`)
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/admin/pallet`, { data: { pallet: id } })
      updateSuccess(id, null, `Deleted: ${name}!`)
      closeRemove()
      refresh()
    }
    catch (err) {
      updateError(id, null, `Failed to delete: ${name}`)
    }
  }

  return (
    <>
      <DeleteModal text={remove.name} open={isRemove} cancel={closeRemove} confirm={deletePallet} />
      <div className="flexbox-column-start" style={{ maxWidth: 250 }}>
        <h2>Pallet</h2>
        <Collapse in={open}>
          <Select
            label="printer"
            value={printer}
            onChange={(value) => handlePallet("printer", value)}
            data={printers ? formatPrinters(printers) : []}
          />
          <TextInput
            label="name"
            value={pallet.name}
            onChange={(event) => setPallet({ ...pallet, name: event.currentTarget.value })}
            autoComplete="off"
            className="full-width"
          />

          <div style={{ fontSize: 14, marginTop: 4, marginBottom: 3 }}>type</div>
          <SegmentedControl value={type} onChange={(value) => setPallet({ ...pallet, type: value })} data={["garment", "tag"]} style={{ maxWidth: 150 }} />
          <div style={{ marginBottom: 15 }}>
            <Dimensions width={width} height={height} setDimensions={handlePallet} />
          </div>
        </Collapse>
        <AddButton text="pallet" onClick={open ? () => postPallet() : () => setOpen(true)} />
      </div>
      <PalletList pallets={pallets} openRemove={openRemove} />
    </>
  );
}

export default Pallet;