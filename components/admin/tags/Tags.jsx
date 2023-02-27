import { Collapse, Select } from "@mantine/core";
import axios from "axios";
import { useState } from "react";
import SizeSelect from "../../new-product/SizeSelect";
import AddButton from "../../ui/AddButton";
import { showError, showLoading, updateError, updateSuccess } from "../../ui/alerts";
import DeleteModal from "../../ui/DeleteModal";
import useRefresh from "../../ui/useRefresh";
import useRemove from "../../ui/useRemove";
import { formatPallets } from "../format";
import usePallets from "../pallet/usePallets";
import useSizes from "../size/useSizes";
import TagsList from "./TagsList";
import useTags from "./useTags";

function Tags() {

  const [open, setOpen] = useState(false)
  const blank = { size: null, pallet: null }
  const [tag, setTag] = useState(blank)
  const { size, pallet } = tag
  const { change, refresh } = useRefresh()
  const { pallets } = usePallets(null, "tag")
  const { sizes } = useSizes({})
  const { tags } = useTags(change)
  const { remove, isRemove, openRemove, closeRemove } = useRemove()

  function handleTag(field, value) {
    setTag({ ...tag, [field]: value })
  }

  async function postTag() {
    if (!size || !pallet) {
      showError(!size ? "size" : "pallet", null, `Missing ${!size ? "size" : "pallet"}!`)
      return
    }
    showLoading(size, null, `Adding ${size} tag...`)
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/tags`, tag)
      refresh()
      setTag(blank)
      updateSuccess(size, null, `Added ${size} tag!`)
    }
    catch (err) {
      console.log(err)
      updateError(size, null, `Failed to add ${size} tag!`)
    }
  }

  async function deleteTag() {
    const { id, size_id, pallet } = remove
    const name = `${size_id} - ${pallet.name}`
    showLoading(id, name, `Deleting tag...`)
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/admin/tags/${id}`)
      refresh()
      closeRemove()
      updateSuccess(id, name, `Deleted tag!`)
    }
    catch (err) {
      console.log(err)
      updateError(id, name, `Failed to delete tag!`)
    }
  }

  return (
    <>
      <DeleteModal text={`${remove?.size_id} - ${remove?.pallet?.name}`} open={isRemove} cancel={closeRemove} confirm={deleteTag} />
      <div className="full-width" style={{ maxWidth: 250 }}>
        <h2>Tags</h2>
        <Collapse in={open} style={{ margin: "15px 0px" }}>
          <Select label="size" value={size} onChange={(value) => handleTag("size", value)} data={!sizes ? [] : sizes} />
          <Select label="pallet" value={pallet} onChange={(value) => handleTag("pallet", value)} data={!pallets ? [] : formatPallets(pallets)} />
        </Collapse>
        <AddButton onClick={open ? () => postTag() : () => setOpen(true)} text="Tags" />
        <TagsList tags={tags} openRemove={openRemove} />
      </div>

    </>
  );
}

export default Tags;