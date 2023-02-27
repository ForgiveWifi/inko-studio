import axios from "axios"
import { useEffect, useState } from "react"

function useTags(change) {

  const [tags, setTags] = useState(null)

  useEffect(() => {
    fetchTags()
    async function fetchTags() {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/tags`)
      setTags(data)
    }
  }, [change])
  return ({ tags });
}

export default useTags;