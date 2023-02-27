import { useState } from "react";
import { unformatDesign } from "../../lib/functions";

function useImages(pallet, product) {

  const blank = { placement: "front", x_offset: (pallet.width * pallet.scale - 160) / 2, y_offset: 0 }
  const [current, setCurrent] = useState(blank)
  const [list, setList] = useState(product ? product.design.map(design => unformatDesign(design, pallet)) : [])

  const { placement } = current

  function addFile(file) {
    setCurrent({ ...current, art_file: file[0] })
  }

  function newFile(file) {
    addCurrentToList()
    setCurrent({ ...blank, placement: placement, art_file: file[0] })
  }

  function clearCurrent() {
    setCurrent({ ...blank, placement: placement });
  }

  function clearList() {
    setList([])
  }

  function addCurrentToList() {
    setList([...list, current])
    clearCurrent()
  }

  function selectFromList(index) {
    const new_list = list.filter(obj => obj.placement === placement)
    const removed = new_list.splice(index, 1)
    const new_current = removed[0]
    setCurrent(new_current)
    setList(list.filter(obj => obj !== new_current));
  }

  function resize(prev_pallet) {

    const { width, height, scale } = prev_pallet
    const { width: pallet_width, height: pallet_height, scale: pallet_scale } = pallet

    const width_scale = (pallet_width * pallet_scale) / (width * scale)
    const height_scale = (pallet_height * pallet_scale) / (height * scale)

    function scaleImage(image) {
      const { width, height, x_offset, y_offset } = image
      let ratio = null
      if (y_offset + (height * width_scale) > pallet_height * pallet_scale) {
        ratio = height_scale
      } else {
        ratio = width_scale
      }
      return ({
        ...image,
        width: width * ratio,
        height: height * ratio,
        x_offset: ratio === width_scale ? x_offset * ratio : x_offset / (prev_pallet.width * scale - width) * ((pallet_width * pallet_scale) - (width * ratio)),
        y_offset: y_offset * ratio
      })
    }
    setCurrent(scaleImage(current))
    setList(list.map((image) => scaleImage(image)))
  }

  return { current, setCurrent, list, addFile, newFile, clearCurrent, clearList, addCurrentToList, selectFromList, resize }
}

export default useImages;