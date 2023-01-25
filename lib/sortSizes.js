const options = ["KIDS","S","M","L","XL", "2XL", "3XL"]

function sortSizes(sizes) {
  return sizes.sort((a,b) => options.indexOf(a) - options.indexOf(b))
}

export default sortSizes;