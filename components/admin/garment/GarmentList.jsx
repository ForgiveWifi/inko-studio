import Divider from "../../ui/Divider";
import NoBox from "../../ui/NoBox";

function GarmentList({ garments, openEdit }) {
  if (!garments) {
    return null
  }
  if (garments.length === 0) {
    return <NoBox text="No stock" />
  }
  return (
    <>
      <div className="full-width" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr)", gap: 15 }}>
        {
          garments.map((garment, i) => {
            const { id, size_id, style_id, style, stock, color } = garment
            return (
              <>
                <button key={id} onClick={() => openEdit(i)} className="flexbox-row flex-wrap relative full-width white-border radius15" style={{ padding: 15, gap: 15 }}>
                  <div className="relative flexbox" >
                    <img src={style.front_image} className="absolute radius10" style={{ width: 125, height: 125 }} />
                    <div className="radius10" style={{ backgroundColor: color.hex, width: 125, height: 125 }}></div>
                  </div>

                  <div className="flexbox-column-start flex-wrap" style={{ marginBottom: "auto" }}>
                    <h5> {style.name} </h5>
                    <div className="flexbox-row">
                      <div className="flexbox-row">
                        <div>{color.name}</div>
                      </div>
                      <Divider />
                      <div> {style_id} </div>
                    </div>
                    <h3 className="margin-right">{size_id}</h3>
                  </div>


                  <div className="flexbox-row absolute" style={{ bottom: 8, right: 12 }}>
                    <h5>stock:</h5>
                    <div style={{ marginLeft: 10 }}> {stock} </div>
                  </div>

                </button>
              </>
            )
          })
        }

      </div>
    </>
  );
}

export default GarmentList;