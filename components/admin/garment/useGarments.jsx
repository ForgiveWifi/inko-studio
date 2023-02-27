import axios from "axios";
import { useEffect, useState } from "react";

function useGarments() {
  const [garments, setGarments] = useState(null)

  useEffect(() => {
    fetchGarments()
    async function fetchGarments() {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/garments`)
      setGarments(data)
    }
  }, [])

  return ({ garments });
}

export default useGarments;