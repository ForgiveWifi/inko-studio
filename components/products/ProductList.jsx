import HorzDivider from "../ui/HorzDivider";
import NoBox from "../ui/NoBox";
import NewButton from "./NewButton";
import ProductCard from "./ProductCard";

function ProductList({products, setSelected}) {

  if (!products) {
    return null
  }
  return(
    <>
      <div className="product-grid">
        <NewButton />
        {
          products.map((product, i) => {
            return(
              <ProductCard key={i} product={product} select={() => setSelected(i)}/>
            )
          })
        }
        { 
          products.length < 3 ?
          Array(3 - products.length).fill(0).map((_, i) => {
            return <div key={i}></div>
          }) :
          null
        }
      </div>
    </>
  )
}

export default ProductList;