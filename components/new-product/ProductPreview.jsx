import ProductButtons from "./ProductButtons";
import CurrentImage from "./CurrentImage";
import BackPreview from "./BackPreview";
import FrontPreview from "./FrontPreview";

function ProductPreview({ garment, pallet, color, currentImage, list, setCurrentImage, clearCurrent, addCurrentToList, selectFromList }) {

  const { art_file, placement, width, height } = currentImage
  const front_placement = placement === "front"
  const sku = garment

  return (
    <>
      <div className="flexbox" style={{ position: "relative", width: 650, height: 650 }}>
        <FrontPreview front={list.filter(image => image.placement === "front")} sku={sku} color={color} pallet={pallet} selectFromList={selectFromList} noImage={!art_file} zIndex={front_placement ? 20 : 1} />
        <BackPreview back={list.filter(image => image.placement === "back")} sku={sku} color={color} pallet={pallet} selectFromList={selectFromList} noImage={!art_file} zIndex={front_placement ? 1 : 20} />
        {art_file ? <CurrentImage currentImage={currentImage} setCurrentImage={setCurrentImage} pallet={pallet} dark={color?.dark} /> : null}
        <ProductButtons clearCurrent={clearCurrent} addCurrentToList={addCurrentToList} currentImage={currentImage} setCurrentImage={setCurrentImage} pallet={pallet} />
        <div style={{ position: "absolute", top: 10, left: 10, zIndex: 30 }}>
          <button
            onClick={front_placement ? () => setCurrentImage({ ...currentImage, placement: "back" }) : () => setCurrentImage({ ...currentImage, placement: "front" })}
            className="orange-button full-width"
            style={{ width: 110, fontSize: 20, padding: "4px 10px", borderRadius: 10 }}
          >
            {placement.toUpperCase()}
          </button>
          {
            art_file ?
              <div className="flexbox-row-start" style={{ marginTop: 12, marginLeft: 5 }}>
                <div className='flexbox-column-start' >
                  <h5 className='grey-text'>W:</h5>
                  <h5 className='grey-text'>H:</h5>
                </div>

                <div className='flexbox-column-start'>
                  <h5 className='grey-text' style={{ marginLeft: 5 }}>{(width / pallet.scale).toFixed(1)} in.</h5>
                  <h5 className='grey-text' style={{ marginLeft: 5 }}>{(height / pallet.scale).toFixed(1)} in.</h5>
                </div>
              </div> :
              null
          }

        </div>
      </div>
    </>
  );
}


export default ProductPreview;