import { useEffect, useState } from "react";
import { scale } from "../../lib/functions";

function useTag(id, ref, pallet, art) {

  const [image, setImage] = useState(art)
  const [dimensions, setDimensions] = useState(null)
  const [loaded, setLoaded] = useState(false)

  function clear() {
    setImage(null)
    setLoaded(false)
    setDimensions({})
  }

  useEffect(() => {
    if (image && ref.current) {
      const w = ref.current.width
      const h = ref.current.height
      const ratio = scale(w, h, pallet)

      setDimensions({
        width: w * ratio,
        height: h * ratio
      })
    }
  }, [loaded, id])


  return ({ image, setImage, dimensions, setLoaded, clear });
}

export default useTag;