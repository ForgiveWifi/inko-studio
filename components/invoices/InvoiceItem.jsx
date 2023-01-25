import { motion } from "framer-motion"
import { toTime, toDate } from "../../lib/time";
import toDollars from "../../lib/toDollars";
import StatusBox from "./StatusBox";

function InvoiceItem({invoice, select}) {

  const { number, id, amount_due, status, due_date, lines} = invoice

  const items = lines.data.reduce((accumulator, value) => {
    return accumulator + value.quantity;
  }, 0);
  return (
    <>
      <motion.button
        onClick={select}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2}}
        className="white-border background3 radius10 full-width space-between flexbox-row flex-wrap"
        style={{ height: 80, padding: 15}}
      > 
        <div className="flexbox" style={{ width: 70 }}>
          {
            !number ? 
            "--" : 
            <div className="flexbox-row" style={{ gap: 5 }}>
              <h5>#</h5>
              <h3>{parseInt(number.slice(-4))}</h3>
            </div>
          }
        </div>
        <StatusBox status={status} />
        <h5 className="text-center" style={{width: 300}}>{id}</h5>
      
        <h5 className="text-center" style={{width: 100}}>{toDollars(amount_due)}</h5>

        <h5 className="text-center" style={{width: 70}}>{items}</h5>
        
        <div className="flexbox-column" style={{ width: 100}}>
          <h5>{toDate(due_date * 1000, "short")}</h5>
          <h5>{toTime(due_date * 1000)}</h5>
        </div>
      </motion.button>
    </>
  );
}

export default InvoiceItem;