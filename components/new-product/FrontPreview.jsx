import SingleImage from "./SingleImage";

function FrontPreview({ front, sku, color, pallet, selectFromList, noImage, zIndex }) {

  const { width, height, front_image, front_offset } = pallet

  return (
    <>
      <div id="front-preview" className="flexbox" style={{ position: "absolute", zIndex: zIndex, width: 650, height: 650 }}>
        <div className="radius10" style={{ position: "absolute", backgroundColor: color?.hex || "white", width: "649px", height: "649px" }}></div>
        {
          sku ?
            <img
              src={sku !== "3001" ? front_image : `/front-${sku}.png`}
              alt={`front-${sku}`} className="radius10"
              style={{ position: "absolute", width: 650, height: 650 }}
              draggable="false"
            /> :
            null
        }
        <div
          className="flexbox radius5"
          style={{
            position: "relative",
            bottom: front_offset,
            width: width * pallet.scale,
            height: height * pallet.scale,
            zIndex: 40
          }}>
          {
            front.map((image, i) => {
              const { art_file } = image
              return (
                <SingleImage key={art_file instanceof File ? art_file.name : art_file} image={image} onClick={() => selectFromList(i)} noImage={noImage} dark={color?.dark} />
              )
            })
          }
        </div>
      </div>
    </>
  );
}

export default FrontPreview;