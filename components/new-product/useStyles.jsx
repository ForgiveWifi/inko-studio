import axios from "axios";
import { useEffect, useState } from "react";
import { showError } from "../ui/alerts";

function useStyles() {
  const [styles, setStyles] = useState()

  useEffect(() => {
    fetchStyles()
    async function fetchStyles() {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/style`)
        setStyles(data)
      }
      catch (err) {
        showError("fetch-styles", null, "Problem getting styles!")
      }
    }
  }, [])

  return ({ styles });
}

export default useStyles;