function OrderStatus({status}) {
  let color 
  switch (status) {
    case "receieved":
      color = "purple"
      break;
    case "production_hold":
      color = "grey"
      break; 
    case "intake_hold":
      color = "grey"
      break; 
    case "open":
      color = "grey"
      break;
    case "completed":
      color = "#4d9948"
      break;
    case "shipped":
      color = "#4d9948"
      break;
    case "cancelled":
      color = "red"
      break;
    default: 
      color = "white"
  } 

  return (
    <h5 className="flexbox radius10" style={{ backgroundColor: color, padding: "0px 10px", height: 30 }}>{status.toUpperCase()}</h5>
  )
}

export default OrderStatus;