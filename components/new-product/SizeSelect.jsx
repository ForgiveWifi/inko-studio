import NoBox from "../ui/NoBox";
import LoadCircle from "../ui/LoadCircle"

function SizeSelect({ sizes, setSizes, data }) {
  if (!data) {
    return <LoadCircle />
  }
  if (data.length === 0) {
    return <NoBox text="No Sizes" />
  }
  return (
    <>
      <div className="flexbox-row-start full-width flex-wrap" style={{ gap: 8 }}>
        {
          data.map((item, i) => {

            const selected = sizes.includes(item)

            function select() {
              if (selected) {
                setSizes(sizes.filter(size => size !== item))
              }
              else {
                setSizes([...sizes, item].sort((a, b) => data.indexOf(a) - data.indexOf(b)))
              }
            }

            return (
              <button key={i} onClick={select} className={selected ? "background2 radius5" : "background1 radius5"} style={{ padding: "3px 20px", outline: selected ? "2px solid white" : "none" }}>
                <h4>{item.toUpperCase()}</h4>
              </button>
            )
          })
        }
      </div>
    </>
  );
}

export default SizeSelect;