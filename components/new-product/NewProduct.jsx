import { useEffect, useState } from "react"
import { useUser } from '@auth0/nextjs-auth0/client'
import axios from "axios";
import { findBySKU, findColor, formatDesign } from "../../lib/functions";
import { Button, Select } from "@mantine/core";
import { usePrevious, useMediaQuery } from '@mantine/hooks';
import ProductDetails from "../../components/new-product/ProductDetails";
import { showError, showLoading, updateSuccess, updateError } from '../../components/ui/alerts'
import NoBox from "../../components/ui/NoBox.jsx";
import ProductPreview from "../../components/new-product/ProductPreview";
// import ConfirmModal from "../../components/new-product/ConfirmModal.jsx";
import { uploadFirebase, screenshot } from "../../lib/firebaseFunctions";
import { deleteObject } from "firebase/storage";
import BackButton from "../../components/ui/BackButton"
import garments from "../../data/garments";
import ColorSelect from "../../components/new-product/ColorSelect";
import SizeSelect from "../../components/new-product/SizeSelect";
import { ImageUpload } from "../../components/new-product/ImageUpload";
import useImages from "../../components/new-product/useImages";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';
import UpdateButtons from "../ui/EditButtons";

function NewProduct({text, product, close, refresh}) {

  const { user } = useUser()
  const mobile = useMediaQuery('(max-width: 670px)')

  const [garment, setGarment] = useState(product ? findBySKU(product.style).value : garments[0].value)
  const { current, setCurrent, list, addFile, clearCurrent, clearList, addCurrentToList, selectFromList, scaleDimensions } = useImages(garment.pallet, product)
  const [details, setDetails] = useState({name: product?.name || "", description: product?.description ||  ""})
  const previousPallet = usePrevious(garment.pallet)
  const [color, setColor] = useState(product ? findColor(product.color) : null)
  const [sizes, setSizes] = useState(product ? product.sizes.map(size => size.size) : [])
  const [error, setError] = useState(false)
  // const [openConfirm, setOpenConfirm] = useState(false)

  useEffect(() => {
    if (previousPallet) {
      scaleDimensions(previousPallet)
    }
  }, [garment])

  function openConfirmModal() {
    setError(true)
    if (!details.name) {
      showError("name-error", null, `No product name!`)
    } else
    if (!color) {
      showError("style-error", null, `No color selected!`)
    } else
    if (sizes.length === 0) {
      showError("size-error", null, `No size selected`)
    } else
    if (list.length === 0) {
      showError("design-error", null, `Add at least 1 design!`)
    } else 
    if (current.art_file) {
      showError("image-error", null, `Place current image!`)
    } else
    // setOpenConfirm(true)
    if (product) {
      patchProduct()
    } else {
      submitProduct()
    }
  }

  async function submitProduct() {
    try {
      const {previews, design_data, refs} = await uploadAllFirebase()
      await postProduct(previews, design_data, refs)
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
      return({ previews, design_data, refs })
    }
    catch (err) {
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
    return(previews)
  }

  async function uploadImages(previews) {
    const front = previews[0]
    const back = previews[1]
    const art_list = await Promise.all(list.map( design => uploadImage(design)))
    const refs = previews.map(preview => preview.ref).concat(art_list.map(art => art.ref))
    const design_data = art_list.map(art => art.design)
    return({design_data, refs})

    async function uploadImage(design) {
      const { art_file } = design
      const art = await uploadFirebase(user, "art", art_file.name, art_file)
      const { name, url, ref } = art
      return({
        design: {
          ...design,
          art_file: name,
          art_url: url,
          thumbnail_url: design.placement === "front" ? front : back,
        },
        ref: ref
      })
    }
  }
  
  async function postProduct(previews, design_data, refs) { 
    const {name, description} = details
    try {
      showLoading(name, "Uploading...", name)
      const images = design_data.map((design) => formatDesign(design, garment.pallet))
      const product = {
        name: name, 
        description: description,
        sizes: sizes,
        images: previews.map(preview => preview.url),
        attributes: {
          style: garment.sku,
          color: color.name
        },
        designs: images 
      }
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products`, product)
      setError(false)
      clearList()
      setDetails({name: "", description: ""}) 
      setSizes([])
      setColor(null)
      updateSuccess(name, "Product has been uploaded!", name) 
    }
    catch (err) {
      updateError(name, "Server Error: create new product", "Contact us!") 
      refs.map(ref=> deleteObject(ref))
    }
  }

  async function patchProduct() {
    const id = product._id
    showLoading(id,"Editing...", id)
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
      const edited = { message: "hi"}
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, edited)
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
    setGarment(sku)
  }

  return (
    <>
      {
        !mobile ? 
        <>
          <div className="flexbox flex-wrap full-width radius10" style={{ margin: "30px 0px 15px", padding: "0px 50px", alignItems: "flex-start", gap: 15}}>
            <div className="flexbox-column background3 full-width full-height radius10" style={{ maxWidth: "300px", padding: "5px 15px 15px"}}>
              <h2>{text}</h2>
              <ImageUpload current={current} addFile={addFile} addCurrentToList={addCurrentToList}/>
              <ProductDetails details={details} setDetails={setDetails} error={error} />
              <div className="flexbox-column-start full-width" style={{ gap: 10 }}>
                <Select 
                  label="style"
                  value={garment} 
                  onChange={sku => selectSKU(sku)} 
                  data={garments} 
                  // icon={<ArrowDropDownIcon style={{ fill: "rgba(0, 0, 0, 0.6)" }}/>}
                  // iconWidth={10}
                  rightSection={<ArrowDropDownIcon style={{ fill: "rgba(0, 0, 0, 0.6)" }}/>}
                  rightSectionWidth={35}
                  styles={{ rightSection: { pointerEvents: 'none' } }}
                  className="full-width"
                />
                
                <div>
                  <div style={{ fontSize: 14 }}>sizes</div>
                  <SizeSelect sizes={sizes} setSizes={setSizes} sizeOptions={["S", "M", "L", "XL", "2XL", "3XL"]} />
                </div>
                
                <div>
                  <div style={{ fontSize: 14, marginTop: 6}}>colors</div>
                  <ColorSelect data={garment.colors} currentColor={color} setColor={setColor}/>
                </div>
                

              </div>
            </div>
            <div className="flexbox-column">
              <ProductPreview 
                list={list}
                garment={garment} 
                color={color} 
                currentImage={current} 
                setCurrentImage={setCurrent} 
                clearCurrent={clearCurrent}
                addCurrentToList={addCurrentToList}
                selectFromList={selectFromList}
              />
              {
                product ?
                <UpdateButtons cancel={close} edit={() => openConfirmModal()} /> :
                <Button onClick={openConfirmModal} className="orange-button" style={{ margin: "10px 3px 5px auto"}} leftIcon={<AddIcon />} uppercase>create</Button>
              }
            </div>
            {/* <ConfirmModal openConfirm={openConfirm} close={() => setOpenConfirm(false)} details={details} attributes={attributes} sizes={sizes}/> */}
          </div>
        </> :
        <div style={{ marginTop: 30, padding: 20}}><NoBox text="Use a computer to create designs" /></div>
      }
    </>
  );
}

export default NewProduct;