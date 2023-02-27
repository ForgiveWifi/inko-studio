import NoBox from "../ui/NoBox";
import DesignBox from "./DesignBox";

function DesignList({ design }) {
  return (
    <>
      <h3 className="full-width" style={{ marginBottom: 10 }}>IMAGES</h3>
      {
        design ?
          <div className="product-grid" style={{}}>
            {
              design.map((value, i) => {
                return (
                  <DesignBox key={i} design={value} />
                )
              })
            }
            {design.length === 1 ? <div></div> : null}
          </div> :
          <NoBox text="no designs" />
      }

    </>
  );
}

export default DesignList;