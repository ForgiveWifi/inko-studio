import InvoiceSkeleton from "./InvoiceSkeleton";
import InvoiceItem from "./InvoiceItem";
import HorzDivider from "../ui/HorzDivider";
import NoBox from "../ui/NoBox";

function InvoiceList({loading, invoices, setSelected}) {

  if (loading || !invoices) {
    return(
      <div className="flexbox-column full-width" style={{ gap: 10 }}>
        <InvoiceSkeleton count={8} /> 
      </div>
    )
  } else

  if (invoices.length === 0) {
    return(<NoBox text="No invoices"/>)
  } else 

  return (
    <>
      <div className="flexbox-column full-width" style={{ gap: 10 }}>
        {
          invoices.map((invoice,i) => {
            return(
              <>
                <InvoiceItem key={i} invoice={invoice} select={() => setSelected(i)}/>
              </>
            )
          })
        }
      </div>
    </>
  );
}

export default InvoiceList;