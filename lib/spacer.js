
export default function spacer(list) {
  let spacedList = ""
  const length = list.length
  for (let x = 0; x < length; x++) {
    spacedList += list[x]
    if (x < length - 1) {
      spacedList += " | "
    }
  }
  return (spacedList)
}
