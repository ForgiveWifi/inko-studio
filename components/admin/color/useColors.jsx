import axios from "axios";
import { useEffect, useState } from "react";

function useColors(change) {

  const [colors, setColors] = useState(null)

  useEffect(() => {
    fetchColors()
    async function fetchColors() {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/color`)
      setColors(data)
    }
  }, [change])

  return ({ colors });
}

export default useColors;