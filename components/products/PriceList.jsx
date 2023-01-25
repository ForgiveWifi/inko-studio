import { useState, useEffect } from "react";
import Divider from "../ui/Divider";
import InfoIcon from "../ui/InfoIcon";
import { showError } from "../ui/alerts";
import axios from "axios";
import toDollars from "../../lib/toDollars";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

function PriceList({sizes}) {

  const [prices, setPrices] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchPrices()
    async function fetchPrices() {
      try {
        setLoading(true)
        const pricing = await Promise.all(sizes.map(async ({id}) => {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/price/${id}`)
          return(res.data)
        }))
        setPrices(pricing)
        setLoading(false)
      }
      catch (err) {
        showError("products", "Server error - prices", "Contact Us!")
      }
    }
  },[])

  if (!sizes) {
    return null
  }
  return(
    <>
      <div className="flexbox-row">
        <div className="flexbox-column-end">
          {
            sizes.map(({size}, i) => {
              return(
                <div className="flexbox-row" key={i}> 
                  <div>{size}</div>
                  <Divider />
                </div>
              )
            })
          }
        </div>
        <div className="flexbox-column-start">
          {
            !prices || loading ?
            Array(sizes.length).fill(0).map((_,i) => {
              return(
                <div key={i}>
                  <Skeleton style={{ width: 70, borderRadius: 10}} />
                </div>
              )
            }) :
            prices.map((price, i) => {
              if (!price) {
                return(
                  <div className="flexbox-row" style={{ gap: 5, height: 27.5 }} key={i}>
                    <p>No Price</p>
                    <InfoIcon />
                  </div>
                )
              } 
              return(
                <p key={i}>{toDollars(price)}</p>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default PriceList;