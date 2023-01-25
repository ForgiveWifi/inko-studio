import garments from "../data/garments";
import colors from "../data/colors"

function formatDesign(design, pallet) {
  const { placement, width, height, x_offset, y_offset } = design;

  const pallet_width = pallet.width * 20;
  const center = (pallet_width - width) / 2;

  let new_placement;
  let XOffset;

  if (placement === "back") {
    new_placement = "Back Center";
    XOffset = Math.round((x_offset - center) * 1.27);
  } else if (x_offset < (pallet_width - width) / 4) {
    new_placement = "Front Left Chest";
    XOffset = Math.round(x_offset * 1.27);
  } else if (x_offset > (pallet_width - width) / 4 * 3) {
    new_placement = "Front Right Chest";
    XOffset = Math.round((x_offset + width - pallet_width) * 1.27);
  } else {
    new_placement = "Front Center";
    XOffset = Math.round((x_offset - center) * 1.27);
  }
  
  return {
    ...design,
    placement: new_placement,
    width: (width / 20).toFixed(1),
    height: (height / 20).toFixed(1), 
    x_offset: XOffset,
    y_offset: -(Math.round(y_offset * 1.27))
  };
}

function unformatDesign(design, pallet) {
  const { placement, width, height, x_offset, y_offset } = design;

  const pallet_width = pallet.width * 20;
  const new_width = width * 20
  const center = (pallet_width - new_width) / 2;

  let new_placement;
  let XOffset;

  if (placement === "Back Center") {
    new_placement = "back";
    XOffset = x_offset / 1.27 + center
  } else if (placement === "Front Left Chest") {
    new_placement = "front";
    XOffset = x_offset / 1.27;
  } else if (placement === "Front Right Chest") {
    new_placement = "front";
    XOffset = pallet_width - new_width + (x_offset / 1.27)
  } else {
    new_placement = "front";
    XOffset = x_offset / 1.27 + center 
  }

  return {
    ...design,
    placement: new_placement,
    width: width * 20,
    height: height * 20, 
    x_offset: XOffset,
    y_offset: -(Math.round(y_offset / 1.27))
  };
}

 
function scale(w, h, pallet) {
  const width_scale = ( pallet.width / w )
  const height_scale = ( pallet.height / h)
  const ratio = Math.min(width_scale, height_scale)
  return ratio
}

function findLabel(sku) {
  const result = garments.find(item => item.value.sku === sku);
  return result ? result.label : null;
}

function findBySKU(sku) {
  if (!sku) {
    return null
  }
  const result = garments.find(item => item.value.sku === sku);
  return result
}

function findColor(color) {
  return {
    ...colors[color],
    name: color
  }
}
export { formatDesign, unformatDesign, scale, findLabel, findBySKU, findColor }