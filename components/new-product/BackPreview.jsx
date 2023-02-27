import SingleImage from "./SingleImage";

function BackPreview({ back, sku, color, pallet, selectFromList, noImage, zIndex }) {

  const { width, height, back_image, back_offset } = pallet

  return (
    <>
      <div id="back-preview" className="flexbox" style={{ position: "absolute", zIndex: zIndex, width: 650, height: 650 }}>
        <div className="radius10" style={{ position: "absolute", backgroundColor: color?.hex || "white", width: "649px", height: "649px" }}></div>
        {
          sku ?
            <img
              src={sku !== "3001" ? back_image : `/back-${sku}.png`}
              alt="back-blank-tee" className="radius10"
              style={{ position: "absolute", width: 650, height: 650 }}
              draggable="false"
            /> :
            null
        }
        <div
          className="flexbox radius5"
          style={{
            position: "relative",
            bottom: back_offset,
            width: width * pallet.scale,
            height: height * pallet.scale,
            zIndex: 40,
          }}>
          {
            back.map((image, i) => {
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

export default BackPreview;