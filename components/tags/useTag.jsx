import { useEffect, useState } from "react";
import { scale } from "../../lib/functions";

function useTag(size, ref, pallet) {
  const [image, setImage] = useState(null)
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
  }, [loaded, size])
  

  return ({ image, setImage, dimensions, setLoaded, clear }); 
}

export default useTag;