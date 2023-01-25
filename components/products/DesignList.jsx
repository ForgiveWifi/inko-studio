import DesignBox from "./DesignBox";

function DesignList({designs}) {
  return (
    <>
      <h3 className="full-width" style={{ marginBottom: 10}}>Design List</h3>
      <div className="product-grid" style={{}}>
        {
          designs.map((design, i) => {
            return (
              <DesignBox key={i} design={design}/>
            )
          })
        }
        {designs.length === 1 ? <div></div> : null}
      </div>
    </>
  );
}

export default DesignList;