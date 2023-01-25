import ProductButtons from "./ProductButtons";
import CurrentImage from "./CurrentImage";
import BackPreview from "./BackPreview";
import FrontPreview from "./FrontPreview";

function ProductPreview({garment, color, currentImage, list, setCurrentImage, clearCurrent, addCurrentToList, selectFromList }) {

  const { sku, pallet } = garment 
  const { art_file, placement } = currentImage
  const front_placement = placement === "front"

  return (
    <>
      <div className="flexbox" style={{position: "relative", width: 650, height: 650}}>
        <FrontPreview list={list} sku={sku} color={color} pallet={pallet} selectFromList={selectFromList} noImage={!art_file} zIndex={front_placement ? 20 : 1}/>
        <BackPreview list={list} sku={sku} color={color} pallet={pallet} selectFromList={selectFromList} noImage={!art_file} zIndex={front_placement ? 1 : 20 }/>
        { art_file ? <CurrentImage currentImage={currentImage} setCurrentImage={setCurrentImage} pallet={pallet} dark={color?.dark} />  : null}
        <ProductButtons clearCurrent={clearCurrent} addCurrentToList={addCurrentToList} currentImage={currentImage} setCurrentImage={setCurrentImage} pallet={pallet}/>
          <div style={{ position: "absolute", top: 0, right: 5, zIndex: 30}}>
            <button onClick={front_placement ? () => setCurrentImage({...currentImage, placement: "back"}) : () => setCurrentImage({...currentImage, placement: "front"})} className="orange-button full-width" style={{ width: 110, fontSize: 20, margin: 10, padding: "4px 10px", borderRadius: 10 }}>{placement.toUpperCase()}</button>
          </div>
      </div>
    </>
  );
}


  export default ProductPreview;