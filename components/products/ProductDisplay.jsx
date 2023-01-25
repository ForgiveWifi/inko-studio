import { toTime, toDate } from "../../lib/time";
import DesignList from "./DesignList";
import Divider from "../ui/Divider";
import CopyID from "./CopyID";
import Loading from "../ui/Loading";
import ProductCarousel from "./ProductCarousel";
import { useState } from "react";
import colors from "../../data/colors"
import garments from "../../data/garments";
import PriceList from "./PriceList";
import ProductMenu from "./ProductMenu"
import MyModal from "../ui/MyModal";
import ProductPreview from "../new-product/ProductPreview"
import CloseButton from "../ui/CloseButton";
import { findLabel } from "../../lib/functions";
import DeleteModal from "../ui/DeleteModal";
import { showLoading, updateSuccess, updateError } from "../ui/alerts";
import axios from "axios";
import NewProduct from "../new-product/NewProduct";

function ProductDisplay({product, close, refresh}) {

  // const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [edit, setEdit] = useState(false)
  const [remove, setRemove] = useState(false)

  const { _id, name, color, style, description, sizes, images, created_at,} = product

  async function deleteProduct() {
    setRemove(false)
    showLoading(_id, "Deleting...", _id)
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${_id}`)
      close()
      refresh()
      updateSuccess(_id, "Product has been deleted!", _id)
    }
    catch (err) {
      updateError(_id, "Server Error: delete product", "Contact us!")
    }
  }
  
  return (
    <>
      <MyModal open={edit}>
        <CloseButton onClick={() => setEdit(false)} />
        <NewProduct text="Edit Product" product={product} close={() => setEdit(false)} refresh={refresh}/>
      </MyModal>
      <DeleteModal text={name} open={remove} cancel={() => setRemove(false)} confirm={deleteProduct}/>

      
      <div className="flexbox-column flex-wrap" style={{ maxWidth: 650, marginTop: 5, padding: 30 }}>
        
        {/* <ProductCarousel images={images} name={name} setCurrentSlide={setCurrentSlide}/> */}
        <img src={images[0]} alt={name} onLoad={() => setLoaded(true)} className="radius1" style={loaded ? { width: "100%"} : { display: "none"}} />
        
        { !loaded ? <div className="background1 full-width radius10" style={{ width: "100%", paddingBottom: "100%" }}><div className="full-width"></div></div> : null }
        
        <div className="flexbox-column-start full-width">
          <div className="flexbox-column-start" style={{ position: "relative", marginBottom: 20 }} >
            <h2 className="margin-right" style={{ height: 55, fontSize: "40px"}}>{name}</h2>
            <h6>{description}</h6>
            <div style={{ position: "absolute", top: 8, right: 0 }}>
              <ProductMenu file={images[0]} name={name} edit={() => setEdit(true)} remove={() => setRemove(true)} />
            </div>
          </div>
        
          <h5>style:</h5> 
          <div style={{ marginBottom: 5 }}>{findLabel(style)}</div>
          <h5>color:</h5> 
          <div className="flexbox-row">
          <div>{color}</div>
          <div className="max-radius" style={{ backgroundColor:colors[color].hex, width: 30, height: 30, marginLeft: 8 }}></div>
          
          </div>
          <h5>sizes:</h5>
          <PriceList sizes={sizes}/>
          {/* <div className="flexbox-row" style={{ marginTop: 5, gap: 10}}>
            <h5 style={{ marginTop: 2}}>ID: {product._id}</h5>
            <CopyID text="Copy ID" value={_id} />
          </div> */}
          <div style={{ marginTop: 5}}>
            <h5>Created on:</h5>
            <div className="flexbox-row" style={{ marginBottom: "15px"}}>
                <h5>{toDate(created_at, "short")}</h5>
              {/* <Divider />
                <h5>{toTime(created_at)}</h5> */}
            </div>
          </div>
        </div>
        <DesignList designs={product.designs}/>
      </div>
      
    </>
  );
}

export default ProductDisplay;