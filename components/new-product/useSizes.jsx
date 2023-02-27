import axios from "axios";
import { useEffect, useState } from "react";

function useSizes(sku, color) {

  const [sizes, setSizes] = useState()

  useEffect(() => {
    fetchSizes()
    async function fetchSizes() {
      try {
        if (color) {
          const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/size?sku=${sku || ""}&color=${color || ""}`)
          console.log("sizes", data)
          setSizes(data)
        }
      }
      catch (err) {
        showError("fetch-sizes", null, "Problem getting sizes!")
      }
    }
  }, [sku, color])

  return ({ sizes });
}

export default useSizes;