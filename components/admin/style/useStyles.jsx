import axios from "axios";
import { useEffect, useState } from "react";

function useStyles(change) {

  const [styles, setStyles] = useState(null)

  useEffect(() => {
    fetchStyles()
    async function fetchStyles() {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/style`)
      setStyles(data)
    }
  }, [change])


  return ({ styles });

}

export default useStyles;