import { useState, useEffect } from "react"
import axios from "axios"
import { showError } from "../ui/alerts"
import LineSkeleton from "./LineSkeleton"
import Line from "./Line"

function Lines({lines}) {

  const [products, setProducts] = useState([])
  const [load, setLoad] = useState(false)

  useEffect(() => {
    if (lines) {
      fetchProducts()
    }
    
    async function fetchProducts() {
      try {
        setLoad(true)
        const product_list = await Promise.all(lines.data.map(async ({quantity, price, amount}) => {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/stripe/${price.product}`)
          const { data } = res
          console.log("price", price)
          const { name, images, metadata} = data
          return({
            name: name,
            unit_price: price.unit_amount,
            quantity: quantity,
            amount: amount,
            images: images,
            metadata: metadata
          })
        }))
        setProducts(product_list)
        setLoad(false)
      }
      catch (err) {
        showError("products", "Server error - products", "Contact Us!")
      }
    }
    
  },[])

  if (!lines) {
    return null
  }
  if (load) {
    return(
      <div className="product-grid full-width" style={{ gap: 15, marginTop: 15 }}>
        <LineSkeleton count={lines.total_count} />
        {lines.total_count === 1 ? <div></div> : null}
      </div>
    )
  }
  return (
    <>
      <div className="product-grid full-width" style={{ gap: 15, marginTop: 15 }}>
        {/* <LineSkeleton /> */}
        {
          products.map( (product,i) => {
            return <Line key={i} product={product} />
          })
        }
        {products.length === 1 ? <div></div> : null}
      </div>
    </>
  );
}

export default Lines;