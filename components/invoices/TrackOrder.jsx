import { useEffect, useState } from "react";
import HorzDivider from "../ui/HorzDivider";
import OrderStatus from "./OrderStatus";
import axios from "axios";
import { Loader } from "@mantine/core";

function TrackOrder({id}) {

  const [tracking, setTracking] = useState(null)

  console.log("tracking", tracking)
  useEffect(() => {
    fetchTracking()
    async function fetchTracking() {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tracking/${id}`)
      setTracking(data)  
    }
  },[])

  if (!tracking) {
    return <div className="flexbox full-width"><Loader color="white" /></div>
  }
  
  const {purchase_order, shipments, items, status, received_at, created_at, shipped_at, } = tracking 
  const { shipping_carrier, shipping_method, tracking_number, search_link, delivered } = shipments[0]

  return (
    <>
      <div classNane="flexbox-column" style={{ padding: 20 }}>
        <h1>Tracking</h1>
        
        <HorzDivider margin="15px 0px" />
        
        
        <h5>Purchase Order:</h5>
        <p>{purchase_order}</p>
        <div className="flexbox-row" style={{ margin: "10px 0px"}}>
          <h5>status:</h5>
          <div style={{ marginLeft: 10}}>
            <OrderStatus status={status} />
          </div>
        </div>
        <h2>Shipping</h2>
        
        <div className="flexbox-column-start" style={{ gap: 10 }}>
          <div>
            <h5>Shipping Carrier:</h5>
            <div>{shipping_carrier}</div>
          </div>

          <div>
            <h5>Shipping Method:</h5>
            <div>{shipping_method}</div>
          </div>

          <div> 
            <h5>Tracking number: </h5>
            <a href={search_link} target="_blank" rel="noopener">{tracking_number}</a>
          </div>
          
          <div className="flexbox-row">
            <h5>Delivered:</h5>
            <div style={{ marginLeft: 10, marginBottom: 1}}>{delivered ? "YES" : "NO" }</div>
          </div>
        </div>
        
        <div style={{ marginTop: 30}}>Items</div>
        <div className="product-grid">
        {
          items.map((item) => {
            const { id, customer_sku, sku_id, workflow_state } = item
            return(
              <div className="flexbox-column white-border" style={{ padding: 10}}>
                <div className="flexbox-row full-width">
                  <OrderStatus status={workflow_state} />
                  <div className="margin-left">{id}</div>
                </div>
                
              </div>
            )
          })
        }
        </div>
      </div>

    </>
  );
}

export default TrackOrder;