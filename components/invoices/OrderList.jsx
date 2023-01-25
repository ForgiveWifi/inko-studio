import OrderBox from "../boxes/OrderBox";
import OrderSkeleton from "./InvoiceSkeleton";
import NoBox from "../ui/NoBox";

function OrderList({loading, orders}) {
  if (loading || orders === null) {
    return(
      <div className="order-list">
        <OrderSkeleton count={15} />
      </div>
    )
  } else
  if (orders.length === 0) {
    return(<NoBox text="No orders"/>)
  } else 
  return (
    <>
      <div className="flexbox-row full-width" style={{ justifyContent: "space-between", margin: "10px 0px 5px", maxWidth: "600px", position: "relative", top: "13px"}}>
        <h4 className="flexbox" style={{ width: "95px", marginLeft:"10px"}}>
          Order ID
        </h4>
        <h4 className="flexbox" style={{ width: "100px"}} >Company</h4>
        <h4 className="flexbox" style={{ width: "60px"}}>Shirts</h4>
        <h4 className="flexbox no-wrap" style={{ width: "120px", marginRight: "10px"}}>
          Order Date
        </h4>
      </div>
      <div className="order-list">
        {
          orders.map((order,i) => {
            return(
              <OrderBox key={i} order={order} />
            )
          })
        } 
      </div>
    </>
  );
}

export default OrderList;