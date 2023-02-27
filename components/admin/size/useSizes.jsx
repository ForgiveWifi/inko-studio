import axios from "axios"
import { useState, useEffect } from "react"

function useSizes({ change, sku, color }) {

  const [sizes, setSizes] = useState(null)
  const [order, setOrder] = useState(null)

  useEffect(() => {
    fetchSizes()
    async function fetchSizes() {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/size?sku=${sku || ""}&color=${color || ""}`)
      const details = data.map(value => value.size)
      setSizes(details)
      setOrder(details)
    }
  }, [change, sku, color])

  function reset() {
    setSizes(order)
  }

  return ({ sizes, setSizes, order, reset });
}

export default useSizes;