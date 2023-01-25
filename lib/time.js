function toTime(utc) {
  const localTime = new Date(utc)
  return(localTime.toLocaleTimeString('en', { timeStyle: 'short', hour12: true }))
}

function toDate(utc, length) {
  const localTime = new Date(utc)
  const options = { year: "numeric", month: length, day: "numeric" }
  return(localTime.toLocaleDateString(undefined, options))
}


export { toTime, toDate };