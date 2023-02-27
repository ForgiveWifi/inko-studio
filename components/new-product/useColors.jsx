import axios from "axios";
import { useEffect, useState } from "react";

function useColors(sku) {

  const [colors, setColors] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchColors()
    async function fetchColors() {
      try {
        setLoading(true)
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/color?sku=${sku || ""}`)
        setColors(data)
        setLoading(false)
      }
      catch (err) {
        showError("fetch-colors", null, "Problem getting colors!")
      }
    }
  }, [sku])

  return ({ colors, loading });
}

export default useColors;