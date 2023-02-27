import axios from "axios";
import { useState, useEffect } from "react";

function usePallets(change, type) {

  const [pallets, setPallets] = useState(null)

  useEffect(() => {
    fetchPallets()
    async function fetchPallets() {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/pallet?type=${type ? type : ""}`)
      setPallets(data)
    }
  }, [change])

  return ({ pallets });
}

export default usePallets;