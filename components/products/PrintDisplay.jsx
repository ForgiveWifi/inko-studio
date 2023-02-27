import { toTime, toDate } from "../../lib/time";
import DesignList from "./DesignList";
import Divider from "../ui/Divider";
import CopyID from "./CopyID";
import Loading from "../ui/Loading";
import { useState } from "react";
import PriceList from "./PriceList";
import ProductMenu from "./ProductMenu"
import MyModal from "../ui/MyModal";
import ProductPreview from "../new-product/ProductPreview"
import CloseButton from "../ui/CloseButton";
import { findLabel } from "../../lib/functions";
import DeleteModal from "../ui/DeleteModal";
import { showLoading, updateSuccess, updateError } from "../ui/alerts";
import axios from "axios";
import DesignTool from "../new-product/DesignTool";
import ImageCarousel from "../ui/ImageCarousel";
import Color from "../ui/Color"

function PrintDisplay({ product, close, refresh }) {
  if (!product) {
    return null
  }
  const [index, setIndex] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [edit, setEdit] = useState(false)
  const [remove, setRemove] = useState(false)

  const { name, description, images, product: products, design, created_at, } = product
  const { garment } = products[0]
  const { style, color } = garment

  async function deletePrint() {
    setRemove(false)
    showLoading(_id, "Deleting...", _id)
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/product/${_id}`)
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
        <DesignTool text="Edit Product" product={product} close={() => setEdit(false)} refresh={refresh} />
      </MyModal>
      <DeleteModal text={name} open={remove} cancel={() => setRemove(false)} confirm={deletePrint}>
        <img src={images[0]} alt={name} onLoad={() => setLoaded(true)} className="radius1" style={loaded ? { width: "100%" } : { display: "none" }} />
      </DeleteModal>

      <div className="flexbox-column flex-wrap">
        <ImageCarousel images={images} setIndex={setIndex} />

        {/* {!loaded ? <div className="background1 full-width radius10" style={{ width: "100%", paddingBottom: "100%" }}><div className="full-width"></div></div> : null} */}

        <div className="flexbox-column-start full-width" style={{ position: "relative", marginBottom: 20 }} >
          <h2 className="margin-right" style={{ height: 55, fontSize: "40px" }}>{name}</h2>
          <h6 style={{ marginBottom: 15 }}>{description}</h6>
          <div style={{ position: "absolute", top: 8, right: 0 }}>
            <ProductMenu file={images[index]} name={name} edit={() => setEdit(true)} remove={() => setRemove(true)} />
          </div>

          <h5>style:</h5>
          <div style={{ marginBottom: 5 }}>{style.name}</div>

          <h5>color:</h5>
          <Color color={color} />

          <h5>sizes:</h5>
          <PriceList products={products} />
          {/* <div className="flexbox-row" style={{ marginTop: 5, gap: 10 }}>
            <h5 style={{ marginTop: 2 }}>ID: {product._id}</h5>
            <CopyID text="Copy ID" value={_id} />
          </div> */}
          <div style={{ marginTop: 5 }}>
            <h5>created:</h5>
            <div className="flexbox-row" style={{ marginBottom: "15px" }}>
              <div>{toDate(created_at, "short")}</div>
              {/* <Divider />
                <h5>{toTime(created_at)}</h5> */}
            </div>
          </div>
        </div>
        <DesignList design={design} />
      </div>

    </>
  );
}

export default PrintDisplay;