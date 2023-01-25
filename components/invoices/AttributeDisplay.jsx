import toDollars from "../../lib/toDollars";

function AttributeDisplay({ quantity, size, style, color}) {
  return (
    <>
      <div className="flexbox-column-start">
        <Attribute name="qty" attr={quantity} />
        <Attribute name="size" attr={size} />
        <Attribute name="style" attr={style} />
        <Attribute name="color" attr={color} />
      </div>
    </>
  );
}

function Attribute({name, attr}) {
  return(
    <div className="flexbox-row" style={{ gap: 5 }}>
      <h5>{name}:</h5> 
      <div>{attr}</div>
    </div>
  )
}

export default AttributeDisplay;