
function ShippingBox({ ship_address }) {
  const {name,address} = ship_address
  return (
    <div className="white-background radius15 shadow2" style={{ width: "250px", padding: "15px 20px"}}>
      <h5 className="light-grey-text">name:</h5>
      <div className="grey-text">{name}</div>
      <h5 className="light-grey-text" style={{ marginTop: 10}}>address:</h5>
      <div className="grey-text">{address.line1}</div> 
      <div className="grey-text">{address.line2}</div> 
      <div className="grey-text">{`${address.city.toUpperCase()}, ${address.state.toUpperCase()}, ${address.postal_code}`}</div> 
    </div>
  );
}

export default ShippingBox;