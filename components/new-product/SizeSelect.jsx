import sortSizes from "../../lib/sortSizes";

function SizeSelect({sizes, setSizes, sizeOptions}) {
  return (
    <>
      <div className="flexbox-row-start flex-wrap" style={{ gap: "8px", marginTop: '5px'}}> 
      {
        sizeOptions.map((size,i) => {

          const selected = sizes.includes(size)

          function select() {
            if (selected) {
              setSizes(sizes.filter(item => item !== size))
            } 
            else {
              setSizes(sortSizes([...sizes, size]))
            }
          }

          return(
            <button key={i} onClick={select} className={selected ? "background2 radius5" : "background1 radius5"} style={{ padding: "3px 20px", outline: selected ? "2px solid white" : "none"}}>
              <h4>{size.toUpperCase()}</h4>
            </button>
           )
        })
      }
      </div>
    </>
  );
}

export default SizeSelect;