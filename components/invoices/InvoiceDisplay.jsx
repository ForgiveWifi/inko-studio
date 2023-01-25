import { toTime, toDate } from "../../lib/time";
import Divider from "../ui/Divider";
import HorzDivider from "../ui/HorzDivider";
import Lines from "./Lines";
import StatusBox from "./StatusBox";
import toDollars from "../../lib/toDollars";
import InvoiceButtons from "./InvoiceButtons";
import ShippingDisplay from "./ShippingDisplay";
import { useState } from "react";
import MyModal from "../../components/ui/MyModal"
import CloseButton from "../../components/ui/CloseButton"
import TrackOrder from "./TrackOrder";

function InvoiceDisplay({invoice}) {

  const [tracking, setTracking] = useState(false)

  if (!invoice) {
    return(
      null
    )
  }
  const {id, number, status, created, due_date, amount_due, lines, customer_shipping, hosted_invoice_url} = invoice
  return (
    <>
      <MyModal open={tracking} size="xl">
        <CloseButton onClick={() => setTracking(false)} />
        <TrackOrder id={id}/>
      </MyModal>
      <div className="flexbox-column full-width" style={{ marginTop: 5, padding: 30}}>
        <div className="flexbox-row full-width" style={{ margin: "5px 0px", gap: 15}}>
          <StatusBox status={status} />
        </div>
        <div className="flexbox-column-start full-width">
          <h2>{!number ? "Draft" : `Invoice ${number.slice(-4)}`}</h2>
          <div className="flexbox-row" style={{ gap: 15 }}>
            <h5>ID:</h5>
            <p style={{ marginBottom: 2 }}>{id}</p>
          </div>
          
        </div>

        {/* <div className="flexbox-row full-width flex-wrap">
          <div style={{width: 100}}>created:</div>
          <div className="flexbox-row">
            <h5>{toDate(created * 1000, "short")}</h5>
            <Divider />
            <h5>{toTime(created * 1000)}</h5>
          </div>
        </div> */}

        <div className="flexbox-row full-width flex-wrap" style={{ gap: 15}}>
          <h5>due date:</h5>
          <div className="flexbox-row">
            <div>{toDate(due_date * 1000, "short")}</div>
            <Divider />
            <div>{toTime(due_date * 1000)}</div>
          </div>
        </div>

        <div className="flexbox-row space-between full-width flex-wrap" style={{ margin: "6px 0px 10px"}}>
          <h3>{toDollars(amount_due)}</h3>
          <InvoiceButtons status={status} url={hosted_invoice_url} openTracking={() => setTracking(true)}/>
        </div>

        <Lines lines={lines} />

        {/* <div className="flexbox-column" style={{margin: "10px 22px 0px auto"}}>
          <h5 className="margin-left">Total:</h5>
          <h5>{toDollars(amount_due)}</h5>
        </div> */}

        { status !== "draft" ? <ShippingDisplay customerShipping={customer_shipping} /> : null }
      </div>
    </>
  );
}

export default InvoiceDisplay;