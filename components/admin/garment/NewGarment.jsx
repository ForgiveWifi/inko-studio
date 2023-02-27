import { Select, TextInput } from "@mantine/core";
import { useState } from "react";
import axios from "axios";
import { showError, showLoading, updateError, updateSuccess } from "../../ui/alerts";
import ColorSelect from "../../new-product/ColorSelect";
import useColors from "../color/useColors";
import useStyles from "../style/useStyles";
import useSizes from "../size/useSizes";
import spacer from "../../../lib/spacer";
import AddButton from "../../ui/AddButton";
import usePallets from "../pallet/usePallets"
import useTags from "../tags/useTags"
import { formatPallets, formatStyles, formatTags } from "../format";
import { ClearIcon } from "../../ui/Icons";
import NoBox from "../../ui/NoBox"
import LoadCircle from "../../ui/LoadCircle";
import toDollars from "../../../lib/toDollars";


function NewGarment({ refresh }) {

  const [garment, setGarment] = useState({})
  const { sku, color } = garment
  const [size, setSize] = useState([])
  const { pallets } = usePallets(null, "garment")
  const { tags } = useTags()
  const { styles } = useStyles()
  const { colors } = useColors()
  const { sizes } = useSizes({ sku: sku, color: color })

  if (size.some(obj => !sizes.includes(obj.size))) {
    setSize(size.filter(obj => sizes.includes(obj.size)))
  }

  function handlePrice(s, price) {
    setSize(
      size.map(obj => {
        if (obj.size === s) {
          return {
            ...obj,
            price: price ? price : 0
          };
        }
        return obj;
      })
    );
  }

  function handlePallet(s, pallet) {
    setSize(
      size.map(obj => {
        if (obj.size === s) {
          return {
            ...obj,
            pallet: pallet
          };
        }
        return obj;
      })
    );
  }

  function handleTag(s, tag) {
    setSize(
      size.map(obj => {
        if (obj.size === s) {
          return {
            ...obj,
            tag: tag
          };
        }
        return obj;
      })
    );
  }

  function handleGarment(field, value) {
    setGarment({ ...garment, [field]: value })
  }

  async function postGarment() {
    if (!sku || !color || size.length === 0) {
      showError(!sku ? "sku" : !color ? "color" : "sizes", null, `Missing ${!sku ? "SKU" : !color ? "color" : "sizes"}!`)
      return
    }

    if (size.some(obj => obj.pallet === null)) {
      const list = spacer(size.filter(obj => obj.pallet === null).map(obj => obj.size))
      showError(list.toString(), list, `Missing pallets!`)
      return
    }
    if (size.some(obj => obj.price === 0)) {
      const list = spacer(size.filter(obj => obj.price === 0).map(obj => obj.size))
      showError(list.toString(), list, `Missing prices!`)
      return
    }
    const size_list = spacer(size.map(obj => obj.size))
    showLoading(sku, size_list, `Adding garments: ${sku}`)
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/garment`, {
        sku: sku,
        color: color,
        size: size
      })
      refresh()
      setGarment({
        sku: sku
      })
      setSize([])
      updateSuccess(sku, size_list, `Added garments:  ${sku}`)
    }
    catch (err) {
      updateError(sku, size_list, `Failed to add garment!`)
    }
  }

  return (
    <>
      <div className="flexbox-column-start full-width" >
        <h2>New Stock</h2>
        <div>{JSON.stringify(size)}</div>
        <Select value={sku} onChange={(value) => handleGarment("sku", value)} label="sku" data={formatStyles(styles)} className="full-width" />

        <div style={{ fontSize: 14, marginTop: 5, marginBottom: 2 }}>color</div>
        <ColorSelect currentColor={color} setColor={(value) => handleGarment("color", value)} data={colors} />

        <div style={{ fontSize: 14, marginTop: 5, marginBottom: 2 }}>sizes</div>
        <SizeSelect sizes={size} setSizes={setSize} data={sizes} />
        {
          size.length >= 1 ?
            <div className="flexbox-column" style={{ gap: 10, margin: "25px 0px 0px" }}>
              {
                size.map((obj, i) => {
                  return (
                    <Line key={obj.size} size={obj} pallets={pallets} tags={tags} handlePallet={handlePallet} handleTag={handleTag} handlePrice={handlePrice} />
                  )
                })
              }
            </div> :
            null
        }
        <div className="margin-left" style={{ marginTop: 20 }}>
          <AddButton text="STOCK" onClick={postGarment} />
        </div>
      </div>
    </>
  );
}

function Line({ size, pallets, tags, handlePallet, handleTag, handlePrice }) {

  const [isTag, setIsTag] = useState(false)

  function clearTag() {
    handleTag(size.size, null)
    setIsTag(false)
  }

  return (
    <div className="flexbox-row full-width" style={{ gap: 10 }}>
      <div className="no-wrap" style={{ width: 35, paddingLeft: 2 }}>{size.size}</div>
      <Select value={size.pallet} onChange={(value) => handlePallet(size.size, value)} data={pallets ? formatPallets(pallets) : []} placeholder="Pallet" />
      <TextInput value={toDollars(size.price)} onChange={(event) => handlePrice(size.size, parseInt(event.currentTarget.value.replace(/[^\d]/g, "")))} className="no-wrap" style={{ width: 100 }} />
      <div>
        {
          isTag ?
            <Select value={size.tag} onChange={(value) => handleTag(size.size, value)} data={tags ? formatTags(tags.filter(tag => tag.size_id === size.size)) : []} placeholder="Tag" style={{ width: 85 }} rightSection={<ClearIcon onClick={clearTag} />} rightSectionWidth={30} nothingFound="None" /> :
            <AddButton text="tag" onClick={() => setIsTag(true)} style={{ width: 85 }} />
        }
      </div>
    </div >
  )
}

function SizeSelect({ sizes, setSizes, data }) {
  if (!data) {
    return <LoadCircle />
  }
  if (data.length === 0) {
    return <NoBox text="No Sizes" />
  }
  return (
    <>
      <div className="flexbox-row-start full-width flex-wrap" style={{ gap: 8 }}>
        {
          data.map((item, i) => {
            const selected = sizes.some(obj => obj.size === item)
            function select() {
              if (selected) {
                setSizes(sizes.filter(obj => obj.size !== item))
              }
              else {
                setSizes([...sizes, { size: item, pallet: null, tag: null, price: 0 }].sort((a, b) => data.indexOf(a.size) - data.indexOf(b.size)))
              }
            }
            return (
              <button key={item} onClick={select} className={selected ? "background2 radius5" : "background1 radius5"} style={{ padding: "3px 20px", outline: selected ? "2px solid white" : "none" }}>
                <h4>{item.toUpperCase()}</h4>
              </button>
            )
          })
        }
      </div>
    </>
  );
}

export default NewGarment;