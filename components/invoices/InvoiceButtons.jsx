import { Button } from "@mantine/core";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { MdPayment } from "react-icons/md"
import {CgFileDocument} from "react-icons/cg"

function InvoiceButtons({status, url, openTracking}) {

  const draft = status === "draft"
  const open = status === "open"
  const paid = status === "paid"

  if (draft) {
    return null
  }
  return (
    <>
      <div className="flexbox-row" style={{ gap: 15 }}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Button
              className="white-border"
              leftIcon={open ? <MdPayment style={{fontSize: 20}}/> : <CgFileDocument style={{fontSize: 20}}/>}>
              {
                open ?
                "Pay" :
                "Invoice"
              }
            </Button>
          </a>
        {
          paid &&
          <Button onClick={openTracking} className="white-border" leftIcon={<MyLocationIcon sx={{ fontSize: "20px"}} />} >Track Order</Button>
        }
      </div>
      
    </>
  );
}

export default InvoiceButtons;