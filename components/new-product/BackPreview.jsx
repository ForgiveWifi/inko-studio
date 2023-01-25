import SingleImage from "./SingleImage";

function BackPreview({list, sku, color, pallet, selectFromList, noImage, zIndex }) {

  const { width, height, offset } = pallet

  return (
    <>  
      <div id="back-preview" className="flexbox" style={{ position: "absolute", zIndex: zIndex, width: 650, height: 650}}>
        <div className="radius10" style={{ position: "absolute", backgroundColor: color?.hex || "white", width: "650px", height: "650px"}}></div>
          {
            sku ? 
            <img 
              src={`/back-${sku}.png`} 
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
            bottom: offset.back,
            width: width * 20, 
            height: height * 20, 
            zIndex: 40,
          }}>
          {
            list.map((image, i) => {
              if (image.placement === "front") {
                return null
              }
              return(
                <SingleImage key={i} image={image} onClick={() => selectFromList(i)} noImage={noImage} dark={color?.dark} />
              )
            })
          }
        </div>
      </div> 
    </>
  );
}

export default BackPreview;