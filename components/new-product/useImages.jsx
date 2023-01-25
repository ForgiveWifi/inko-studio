import { width } from "@mui/system";
import { useState } from "react";
import { scale, unformatDesign } from "../../lib/functions";

function useImages(pallet, product) {

  const blank = { placement: "front", x_offset: (pallet.width * 20 - 160) / 2, y_offset: 0 }
  const [current, setCurrent] = useState(blank)
  const [list, setList] = useState(product ? product.designs.map(design => unformatDesign(design, pallet)) : [])

  function addFile(file) {
    setCurrent({...current, art_file: file[0]})
  }

  function clearCurrent() {
    setCurrent({...blank, placement: current.placement});
  }

  function clearList() {
    setList([])
  }

  function addCurrentToList() {
    setList([...list, current])
    clearCurrent()
  }

  function selectFromList(index) {
    const new_list = [...list]
    const removed = new_list.splice(index, 1)
    setList(new_list);
    setCurrent(removed[0])
  } 

  function scaleDimensions(previousPallet) { 
    const { width, height } = previousPallet
    const ratio = scale(width, height, pallet)

    function scaleImage(image) {
      const { width, height, x_offset, y_offset } = image
      return({
        ...image,
        width: width * ratio,
        height: height * ratio,
        x_offset: x_offset * ratio,
        y_offset: y_offset * ratio
      })
    }
    setCurrent(scaleImage(current))
    setList(list.map((image) => scaleImage(image)))
  }
  
  return { current, setCurrent, list, addFile, clearCurrent, clearList, addCurrentToList, selectFromList, scaleDimensions }
}

export default useImages;