import { Chip, NumberInput, Select, Switch, TextInput } from "@mantine/core";
import axios from "axios";
import { useState } from "react";
import EditButtons from "../../ui/EditButtons"
import { showError, showLoading, updateError, updateSuccess } from "../../ui/alerts";
import Color from "../../ui/Color"
import Date from "../../ui/Date";
import DeleteModal from "../../ui/DeleteModal";
import Divider from "../../ui/Divider";
import { DeleteIcon, EditIcon, SaveIcon } from "../../ui/Icons";
import usePallets from "../pallet/usePallets";
import useEdit from "../../ui/useEdit"
import { formatPallets, formatTags } from "../format";
import useTags from "../tags/useTags";
import { RxArchive } from "react-icons/rx"
import { BiCheck } from "react-icons/bi"
import isEqual from "lodash.isequal";
import ImageCarousel from "../../ui/ImageCarousel"
import toDollars from "../../../lib/toDollars";

function EditStock({ garment, refresh, close, pallets, tags }) {
  if (!garment) {
    return null
  }
  const [ref, setRef] = useState(garment)
  const { id, style, style_id, size_id, color, pallet_id, pallet, tags_id, price, stock, archived, updated_at } = ref
  const { isEdit, openEdit, closeEdit } = useEdit()
  const [remove, setRemove] = useState(false)

  function handleRef(field, value) {
    setRef({ ...ref, [field]: value })
  }

  function cancel() {
    setRef(garment)
    closeEdit()
  }


  async function editStock() {
    if (isNaN(stock)) {
      showError("stock-error", null, "Stock is not a number!")
      return
    }
    if (price === 0) {
      showError("price-error", null, "Price cannot be 0!")
      return
    }
    const name = `${style_id} | ${color.name} | ${size_id}`
    showLoading(id + stock, `Stock: ${stock}`, name)
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/admin/garment/${id}`, {
        pallet: pallet_id,
        tags: tags_id,
        price: price,
        stock: stock,
        archived: archived
      })
      refresh()
      closeEdit()
      updateSuccess(id + stock, `Stock: ${stock}`, name)
    }
    catch (err) {
      console.log(err)
      updateError(id + stock, `Failed to edit stock!`, name)
    }

  }

  async function deleteStock() {
    const name = `${style_id} | ${size_id} | ${color.name}`
    showLoading(id, `Deleting...`, name)
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/admin/garment/${id}`)
      refresh()
      setRemove(false)
      close()
      updateSuccess(id, `Deleted!`, name)
    }
    catch (err) {
      updateError(id, `Failed to delete!`, name)
    }
  }

  return (
    <>
      <DeleteModal text="" open={remove} cancel={() => setRemove(false)} confirm={deleteStock}>
        <div className="flexbox-row" style={{ marginTop: 10 }}>
          <div>{style_id}</div>
          <Divider />
          <div>{size_id}</div>
          <Divider />
          <div>{color.name}</div>
        </div>

      </DeleteModal>
      <div style={{ padding: 10 }}>
        <div style={{ paddingRight: 20 }}>{style.name}</div>
        <div className="flexbox-row" style={{ marginBottom: 5 }}>
          <h3>{size_id}</h3>
          <Divider />
          <div>{color.name}</div>
        </div>

        <ImageCarousel images={[style.front_image, style.back_image]} color={color.hex} />
        {/* <div className="flexbox relative full-width" style={{ paddingBottom: "100%", top: 0 }}>
          <img src={style.front_image} className=" absolute full-width" style={{ top: 0, zIndex: 1 }} />
          <div className="absolute full-width" style={{ backgroundColor: color.hex, width: "100%", height: "100%", top: 0 }}></div>
        </div> */}

        <Select label="pallet" value={pallet_id} onChange={value => handleRef("pallet_id", value)} data={pallets ? formatPallets(pallets) : [{ label: pallet.name, value: pallet_id }]} disabled={!isEdit} nothingFound="No pallet" />

        <Select label="tag" value={tags_id} onChange={value => handleRef("tags_id", value)} data={tags ? formatTags(tags.filter(tag => tag.size_id === size_id)) : []} disabled={!isEdit} nothingFound="No tag" allowDeselect={true} />
        <TextInput label="price" value={toDollars(price)} onChange={(event) => handleRef("price", parseInt(event.currentTarget.value.replace(/[^\d]/g, "")) || 0)} className="no-wrap" style={{ width: 90 }} disabled={!isEdit} />
        <div className="flexbox-row">
          <NumberInput label="stock" value={stock} onChange={(value) => handleRef("stock", value)} min={0} max={10000} disabled={!isEdit} autoComplete="off" />
        </div>
        <div className="flexbox-row" style={{ height: 45, marginTop: 10 }}>
          {
            isEdit ?
              <div className="flexbox-row">
                <button onClick={() => handleRef("archived", !ref.archived)} className={`max-radius ${archived ? "background1" : ""}`} style={{ padding: "4px 10px", border: "2px solid white" }}>
                  <div className="flexbox-row">
                    {archived ? <BiCheck style={{ fontSize: 18 }} /> : <RxArchive style={{ fontSize: 18 }} />}
                    <h5 style={{ marginLeft: 5 }}>{archived ? "ARCHIVED" : "ARCHIVE"}</h5>
                  </div>
                </button>
              </div> :
              <div>
                <h5>last updated</h5>
                <Date time={updated_at} />
              </div>
          }

        </div>
        <div className="flexbox-row" style={{ marginTop: 10 }}>
          <div>
            {
              isEdit ?
                <EditButtons cancel={cancel} edit={isEqual(garment, ref) ? () => closeEdit() : () => editStock()} /> :
                <EditIcon onClick={openEdit} />
            }
          </div>
          {
            isEdit ?
              <DeleteIcon onClick={() => setRemove(true)} /> :
              null
          }
        </div>
      </div>
    </>
  );
}

export default EditStock;