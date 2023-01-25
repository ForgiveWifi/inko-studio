
function DesignBox({ design }) {

  const { width, height, x_offset, y_offset, art_file } = design

  return (
    <>
      <div className="flexbox-column full-width white-outline radius10 margin-auto" style={{ maxWidth: 300, padding: 10 }}>

        <h5 className="background2 radius10" style={{ padding: "2px 10px", marginBottom: 10 }}>{design.placement}</h5>

        <div className="flexbox full-height">
          <img 
            src={ art_file instanceof File ? URL.createObjectURL(art_file) : design.art_url }
            alt={ art_file instanceof File ? art_file.name : art_file}
            className="full-width" 
            style={{ maxWidth: "100%", maxHeight: 200, objectFit: "contain", marginBottom: 10}}
          />
        </div>

        <div className="flexbox-row" style={{}}>

          <div className="flexbox-row no-wrap">
            <div className="flexbox-column-end">
              <h4>width:</h4>
              <h4>height:</h4>
            </div>

            <div className="flexbox-start" style={{ marginLeft: "10px" }}>
              <div className="flexbox-row">
                <p>{width}</p>
                <p style={{ marginLeft: "5px"}}>in.</p>
              </div>

              <div className="flexbox-row">
                <p>{height}</p>
                <p style={{ marginLeft: "5px"}}>in.</p>
              </div>
            </div>

          </div>

          <div className="flexbox-row no-wrap" style={{ marginLeft: "15px"}}>
            <div className="flexbox-column-end">
              <h4>x:</h4>
              <h4>y:</h4>
            </div>

            <div className="flexbox-start" style={{ marginLeft: "10px" }}>
              <div className="flexbox-row">
                <p>{x_offset}</p>
                <p style={{ marginLeft: "5px"}}>mm</p>
              </div>

              <div className="flexbox-row">
                <p>{-(y_offset)}</p>
                <p style={{ marginLeft: "5px"}}>mm</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </>
  );
}

export default DesignBox;