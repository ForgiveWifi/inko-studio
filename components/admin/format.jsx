function formatStyles(styles) {
  if (styles) {
    return (styles.map(style => {
      return ({
        label: `${style.sku} - ${style.name}`,
        value: style.sku,
      })
    }))
  } else {
    return []
  }
}

function formatPallets(pallets) {
  return (
    pallets.map((pallet) => {
      return ({
        label: `${pallet.name}`,
        value: pallet.id
      })
    })
  )
}

function formatPrinters(printers) {
  return (
    printers.map((printer) => {
      return ({
        label: `${printer.name}`,
        value: printer.id
      })
    })
  )
}

function formatTags(tags) {
  return (
    tags.map((tag) => {
      return ({
        label: `${tag.pallet.width} x ${tag.pallet.height}`,
        value: tag.id
      })
    })
  )
}

export { formatStyles, formatPallets, formatPrinters, formatTags }