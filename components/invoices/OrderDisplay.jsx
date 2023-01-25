import { Button } from "@mantine/core";
import { toTime, toDate } from "../../utils/time";
import Divider from "../ui/Divider";
import HorzDivider from "../ui/HorzDivider";
import ShippingBox from "./ShippingBox";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ShippingBoxSkeleton from "./ShippingBoxSkeleton";
import ProductList from "./ProductList";
import StatusBox from "./StatusBox";
import toDollars from "../../utils/toDollars";
import InvoiceButtons from "./InvoiceButtons";
import ShippingDisplay from "./ShippingDisplay";

function InvoiceDisplay({order, loading}) {
  return (
    <>
      <div className="flexbox-column full-width">

        <div className="flexbox-row full-width">
          <h2>{order.id}</h2>
        </div>
        
        <div className="flexbox-row full-width" style={{ marginTop: "5px", gap: 15}}>
          <StatusBox status={order.status} />
        </div>
        
        <div className="flexbox-row full-width flex-wrap" style={{marginTop: 10}}>
          <div style={{width: 100}}>created:</div>
          <div className="flexbox-row">
            <h5>{toDate(order.created * 1000, "long")}</h5>
            <Divider />
            <h5>{toTime(order.created * 1000)}</h5>
          </div>
        </div>

        <div className="flexbox-row full-width flex-wrap">
          <div style={{width: 100}}>due date:</div>
          <div className="flexbox-row">
            <h5>{toDate(order.due_date * 1000, "long")}</h5>
            <Divider />
            <h5>{toTime(order.due_date * 1000)}</h5>
          </div>
        </div>

        <div className="flexbox-column-start full-width flex-wrap" style={{ margin: "15px 0px 22px", gap: 10}}>
          <h5 style={{ marginLeft: 10}}>{toDollars(order.amount_due)}</h5>
          <InvoiceButtons status={order.status} order={order}/>
        </div>

        <ProductList loading={loading} lines={order.lines} />
        
        <div className="flexbox-column-start" style={{margin: "10px 22px 0px auto"}}>
          <h5>Total:</h5>
          <h5>{toDollars(order.amount_due)}</h5>
        </div>
        
        {/* <div className="flexbox full-width" style={{ margin: "25px 0px"}}>
          <HorzDivider width="95%"/>
        </div> */}
        <ShippingDisplay customerShipping={order.customer_shipping} />
        
      </div>
    </>

  );
}

export default InvoiceDisplay;