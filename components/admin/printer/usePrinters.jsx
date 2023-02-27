import axios from "axios"
import { useEffect, useState } from "react"

function usePrinters(change) {

  const [printers, setPrinters] = useState(null)

  useEffect(() => {
    fetchPrinters()
    async function fetchPrinters() {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/printer`)
      setPrinters(data)
    }
  }, [change])

  return ({ printers });
}

export default usePrinters;