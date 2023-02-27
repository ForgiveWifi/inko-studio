import { TextInput } from "@mantine/core";
import { useState } from "react";
import { showError, showLoading, updateError, updateSuccess } from "../../ui/alerts";
import axios from "axios";
import useSizes from "./useSizes";
import SizeList from "./SizeList";
import EditButtons from "../../ui/EditButtons"
import DeleteModal from "../../ui/DeleteModal"
import AddButton from "../../ui/AddButton";

function Size() {

  const [change, setChange] = useState(false)
  const [size, setSize] = useState("")
  const { sizes, setSizes, order, reset } = useSizes({ change })
  const [remove, setRemove] = useState(null)

  function refresh() {
    setChange(!change)
  }

  async function postSize() {
    if (size.length === 0) {
      showError("size-error", null, "Missing size!")
      return
    }
    showLoading(size, null, `Adding size: ${size}..`)
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/size/${size}`)
      setSize("")
      refresh()
      updateSuccess(size, null, `Added size: ${size}!`)
    }
    catch (err) {
      updateError(size, `Failed to add: ${size}!`, "Contact us!")
    }
  }

  async function deleteSize() {
    showLoading(remove, null, `Deleting size: ${remove}..`)
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/admin/size/${remove}`)
      refresh()
      setRemove(null)
      updateSuccess(remove, null, `Deleted size: ${remove}!`)
    }
    catch (err) {
      updateError(remove, `Failed to delete: ${remove}!`, "Contact us!")
    }
  }

  async function saveSizes() {
    showLoading("sizes", null, `Saving size order...`)
    try {
      for (let i = 0; i < sizes.length; i++) {
        if (sizes[i] !== order[i]) {
          await updateIndex(sizes[i], i)
        }
      }
      refresh()
      updateSuccess("sizes", null, `Saved size order!`)
    }
    catch (err) {
      updateError("sizes", `Failed to save size order!`, "Contact us!")
    }
  }

  async function updateIndex(size, index) {
    await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/admin/size`, {
      size: size,
      index: index
    })
  }

  if (!sizes && !order) {
    return null
  }
  return (

    <>
      <DeleteModal text={remove + " size"} open={remove} cancel={() => setRemove(null)} confirm={deleteSize} />
      <div className="flexbox-column-start">
        <h2>Size</h2>
        <SizeList list={sizes} setList={setSizes} remove={(i) => setRemove(i)} />
        <div className="flexbox-row" style={{ gap: 5, marginTop: 10 }}>
          <TextInput
            value={size}
            onChange={(event) => setSize(event.currentTarget.value)}
            autoComplete="off"
            style={{ width: 75 }}
          />
          {/* <PlusIcon onClick={postSize} /> */}
          <AddButton text="size" onClick={postSize} />
        </div>
        <div style={{ height: 30, marginTop: 10 }}>
          {sizes.toString() !== order.toString() ? <EditButtons cancel={reset} edit={saveSizes} /> : null}
        </div>

      </div>
    </>
  );
}

export default Size;