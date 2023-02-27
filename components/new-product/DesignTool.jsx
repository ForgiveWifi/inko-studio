import { useEffect, useState } from "react"
import { useUser } from '@auth0/nextjs-auth0/client'
import axios from "axios";
import { formatDesign } from "../../lib/functions";
import { Button, Select } from "@mantine/core";
import { usePrevious, useMediaQuery } from '@mantine/hooks';
import ProductDetails from "./ProductDetails";
import { showError, showLoading, updateSuccess, updateError } from '../ui/alerts'
import NoBox from "../ui/NoBox.jsx";
import ProductPreview from "./ProductPreview";
import ConfirmModal from "../../components/new-product/ConfirmModal.jsx";
import { uploadFirebase, screenshot, deleteRef } from "../../lib/firebaseFunctions";
import ColorSelect from "./ColorSelect";
import SizeSelect from "./SizeSelect";
import { ImageUpload } from "./ImageUpload";
import useImages from "./useImages";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';
import CloseButton from "../ui/CloseButton"
import UpdateButtons from "../ui/EditButtons";
import useColors from "./useColors";
import useSizes from "./useSizes";
import useStyles from "./useStyles";
import isEqual from "lodash.isequal";
import MyModal from "../ui/MyModal";
import Feature from "../ui/Feature";

function DesignTool({ text, product, close, refresh }) {

  const { user } = useUser()
  const mobile = useMediaQuery('(max-width: 670px)')
  const desktop = useMediaQuery('(max-width: 1104px)')


  console.log("hi", product.product.map(obj => obj.garment.size_id))

  const [garment, setGarment] = useState(product ? product.product[0].garment.style.sku : "3001")
  const { styles } = useStyles()
  const pallet = styles ? styles.find(obj => obj.sku === garment) : { width: 16, height: 19.75, "front_offset": 5, "back_offset": 28, scale: 20 }
  const { current, setCurrent, list, addFile, newFile, clearCurrent, clearList, addCurrentToList, selectFromList, resize } = useImages(pallet, product)
  const [details, setDetails] = useState({ name: product?.name || "", description: product?.description || "" })
  const prev_pallet = usePrevious(pallet)
  const [color, setColor] = useState(product ? product.product[0].garment.color : null)
  const [size, setSize] = useState(product ? product.product.map(obj => obj.garment.size_id) : [])
  const [error, setError] = useState(false)
  const [confirm, setConfirm] = useState(false)

  const { colors, loading } = useColors(garment)
  const { sizes } = useSizes(garment, color?.id)

  console.log("size", size)

  const valid_sizes = sizes ? sizes.map(({ size_id }) => size_id) : []

  if (size.some(s => !valid_sizes.includes(s))) {
    setSize(size.filter(size => valid_sizes.includes(size)))
  }

  useEffect(() => {
    if (prev_pallet && !isEqual(pallet, prev_pallet)) {
      resize(prev_pallet)
    }
  }, [garment])

  function openConfirmModal() {
    setError(true)
    if (!details.name) {
      showError("name-error", null, `No product name!`)
      return
    }
    if (!color) {
      showError("style-error", null, `No color selected!`)
      return
    }
    if (size.length === 0) {
      showError("size-error", null, `No size selected`)
      return
    }
    if (list.length === 0) {
      showError("design-error", null, `Add at least 1 image!`)
      return
    }
    if (current.art_file) {
      showError("image-error", null, `Place current image!`)
      return
    }
    // setConfirm(true)
    if (product) {
      patchProduct()
    } else {
      submitProduct()
    }
  }

  async function submitProduct() {
    try {
      const { previews, design_data, refs } = await uploadAllFirebase()
      await postPrint(previews, design_data, refs)
    }
    catch (err) {
    }
  }

  async function uploadAllFirebase() {
    try {
      showLoading("firebase", null, "Uploading images...")
      const previews = await uploadPreviews()
      const { design_data, refs } = await uploadImages(previews)
      updateSuccess("firebase", null, "Uploaded images!")
      return ({ previews, design_data, refs })
    }
    catch (err) {
      console.log(err)
      updateError("firebase", "Server Error: firebase", "Contact us!")
    }
  }

  async function uploadPreviews() {
    const previews = []
    if (list.filter((image) => image.placement === "front").length !== 0) {
      const front = await screenshot(user, "front-preview", details.name)
      previews.push({
        ...front,
        position: "front",
      })
    }
    if (list.filter((image) => image.placement === "back").length !== 0) {
      const back = await screenshot(user, "back-preview", details.name)
      previews.push({
        ...back,
        position: "back"
      })
    }
    return (previews)
  }

  async function uploadImages(previews) {
    const front_thumbnail = previews.find(obj => obj.position === "front")
    const back_thumbnail = previews.find(obj => obj.position === "back")
    const art_list = await Promise.all(list.map(design => uploadImage(design)))
    const refs = previews.map(preview => preview.ref).concat(art_list.map(art => art.ref))
    const design_data = art_list.map(art => art.design)
    return ({ design_data, refs })

    async function uploadImage(design) {
      const { art_file } = design
      const art = await uploadFirebase(user, "art", art_file.name, art_file)
      const { name, url, ref } = art
      return ({
        design: {
          ...design,
          art_file: name,
          art_url: url,
          thumbnail_url: design.placement === "front" ? front_thumbnail.url : back_thumbnail.url,
        },
        ref: ref
      })
    }
  }

  async function postPrint(previews, design_data, refs) {
    const { name, description } = details
    try {
      showLoading(name, "Uploading...", name)
      const images = design_data.map((design) => formatDesign(design, pallet))
      const product = {
        name: name,
        description: description,
        sizes: size,
        style: garment,
        color: color,
        images: previews.map(preview => preview.url),
        designs: images,
        garment: garment,
        pallet: {
          width: pallet.width,
          height: pallet.height
        }
      }
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/print`, product)
      setError(false)
      clearList()
      setDetails({ name: "", description: "" })
      setSize([])
      setColor(null)
      updateSuccess(name, "Product has been uploaded!", name)
    }
    catch (err) {
      console.log(err)
      updateError(name, "Server Error: create new product", "Contact us!")
      refs.map(ref => deleteRef(ref))
    }
  }

  async function patchProduct() {
    const id = product._id
    showLoading(id, "Editing...", id)
    try {
      // const edited = {
      //   name: name, 
      //   description: description,
      //   sizes: sizes,
      //   images: previews.map(preview => preview.url),
      //   attributes: {
      //     style: garment.sku,
      //     color: color.name
      //   },
      //   designs: images 
      // }
      const edited = { message: "hi" }
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`, edited)
      close()
      refresh()
      updateSuccess(id, "Product has been edited!", id)
    }
    catch (err) {
      updateError(id, "Server Error: edit product", "Contact us!")
    }
  }

  function selectSKU(sku) {
    setColor(null)
    setSize([])
    setGarment(sku)
  }

  function formatStyles(styles) {
    if (styles) {
      return (
        styles.map(style => {
          const { sku, type, name } = style
          return ({
            label: name,
            value: sku,
            group: type
          })
        })
      )
    } else {
      return []
    }
  }

  function dropFile(file) {
    if (!current?.art_file) {
      addFile(file)
    }
  }
  return (
    <>
      {
        !mobile ?
          <>
            <div className="flexbox flex-wrap full-width radius10" style={{ margin: "30px 0px 15px", padding: "0px 50px", alignItems: "flex-start", gap: 15 }}>
              <div className="flexbox-column background3 full-width full-height radius10" style={{ maxWidth: "300px", padding: "5px 15px 15px" }}>
                <h2>{text}</h2>
                {!desktop ? <ImageUpload current={current} addFile={dropFile} addCurrentToList={addCurrentToList} /> : null}
                <ProductDetails details={details} setDetails={setDetails} error={error} />
                <div className="flexbox-column-start full-width" style={{ gap: 10 }}>
                  <div>
                    <Select
                      label="style"
                      value={garment}
                      onChange={selectSKU}
                      data={styles ? formatStyles(styles) : [{ label: "Bella + Canvas Unisex Tee", value: "3001" }]}
                      rightSection={<ArrowDropDownIcon style={{ fill: "rgba(0, 0, 0, 0.6)" }} />}
                      rightSectionWidth={35}
                      styles={{ rightSection: { pointerEvents: 'none' } }}
                      style={{ width: 270 }}
                    />
                  </div>

                  <div className="full-width">
                    <div style={{ fontSize: 14, marginTop: 6, marginBottom: 5 }}>colors</div>
                    <ColorSelect currentColor={color} setColor={setColor} data={colors} loading={loading} design={true} />
                  </div>

                  <div className="full-width" style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 14, marginBottom: 3 }}>sizes</div>
                    {
                      color ?
                        <SizeSelect sizes={size} setSizes={setSize} data={sizes ? sizes.map(({ size_id }) => size_id) : []} /> :
                        <NoBox text="Select color" />
                    }
                  </div>
                  {desktop ? <ImageUpload current={current} addFile={dropFile} addCurrentToList={addCurrentToList} /> : null}


                  {/* <div>sku: {JSON.stringify(garment)}</div>
                  <div>color: {JSON.stringify(color)}</div>
                  <div>sizes: {JSON.stringify(size)}</div>
                  <div>sizes: {JSON.stringify(sizes)}</div> */}

                </div>
              </div>
              <div className="flexbox-column">
                <ProductPreview
                  list={list}
                  garment={garment}
                  pallet={pallet}
                  color={color}
                  currentImage={current}
                  setCurrentImage={setCurrent}
                  clearCurrent={clearCurrent}
                  addCurrentToList={addCurrentToList}
                  selectFromList={selectFromList}
                />
                {
                  product ?
                    <UpdateButtons cancel={close} edit={openConfirmModal} /> :
                    <Button onClick={openConfirmModal} className="orange-button" style={{ margin: "10px 3px 5px auto" }} leftIcon={<AddIcon />} uppercase>NEW</Button>
                }
              </div>
              <MyModal open={confirm} size="auto">
                <CloseButton onClick={() => setConfirm(false)} />
                <ConfirmModal sizes={sizes} close={() => setConfirm(false)} />
              </MyModal>
            </div>
          </> :
          <Feature />
      }
    </>
  );
}

export default DesignTool;