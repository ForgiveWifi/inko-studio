function formatDesign(design, pallet) {
  const { placement, width, height, x_offset, y_offset } = design;
  const { scale } = pallet

  const pallet_width = pallet.width * scale;
  const center = (pallet_width - width) / 2;

  let new_placement;
  let XOffset;

  if (placement === "back") {
    new_placement = "Back Center";
    XOffset = Math.round((x_offset - center) / scale * 25.4);
  } else if (x_offset < (pallet_width - width) / 4) {
    new_placement = "Front Left Chest";
    XOffset = Math.round(x_offset / scale * 25.4);
  } else if (x_offset > (pallet_width - width) / 4 * 3) {
    new_placement = "Front Right Chest";
    XOffset = Math.round((x_offset + width - pallet_width) / scale * 25.4);
  } else {
    new_placement = "Front Center";
    XOffset = Math.round((x_offset - center) / scale * 25.4);
  }

  return {
    ...design,
    placement: new_placement,
    width: parseFloat((width / scale).toFixed(1)),
    height: parseFloat((height / scale).toFixed(1)),
    x_offset: XOffset,
    y_offset: -(Math.round(y_offset / scale * 25.4))
  };
}

function unformatDesign(design, pallet) {
  const { placement, width, height, x_offset, y_offset } = design;
  const { scale } = pallet

  const pallet_width = pallet.width * scale;
  const new_width = width * scale
  const center = (pallet_width - new_width) / 2;

  let new_placement;
  let XOffset;

  if (placement === "Back Center") {
    new_placement = "back";
    XOffset = x_offset / scale * 25.4 + center
  } else if (placement === "Front Left Chest") {
    new_placement = "front";
    XOffset = x_offset / scale * 25.4;
  } else if (placement === "Front Right Chest") {
    new_placement = "front";
    XOffset = pallet_width - new_width + (x_offset / scale * 25.4)
  } else {
    new_placement = "front";
    XOffset = x_offset / scale * 25.4 + center
  }

  return {
    ...design,
    placement: new_placement,
    width: width * pallet.scale,
    height: height * pallet.scale,
    x_offset: XOffset,
    y_offset: -(Math.round(y_offset / scale * 25.4))
  };
}

function scale(w, h, pallet) {
  const width_scale = (pallet.width / w)
  const height_scale = (pallet.height / h)
  const ratio = Math.min(width_scale, height_scale)
  return ratio
}

export { formatDesign, unformatDesign, scale }