import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import errorMessage from "../../../lib/errorMesage"
import getStripeID from "../../../lib/getStripeID"

async function handler(req,res) {

  const { method } = req

  switch (method) {
    case "GET":
      try {
        const { id } = req.query
        // const status = await axios.get(`${process.env.DREAM_JUNCTION_API}/v3/orders/show?purchase_order=${id}`, {
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Token token=${process.env.DREAM_JUNCTION_API_KEY}`
        //   }
        // })
        const data = {
          "id": 6724120,
          "purchase_order": id,
          "location": "Santa Ana",
          "received_at": "2020-02-01T23:00:24.691 -07:00",
          "created_at": "2020-02-01T23:56:24.691 -07:00",
          "shipped_at": "2020-02-02T12:21:24.691 -07:00",
          "status": "completed",
          "items": [
            {
              "id": 3344800,
              "customer_sku": "1415956-15",
              "sku_id": 2032,
              "description": "T-SHIRT",
              "workflow_state": "intake_hold"
            },
            {
              "id": 3344800,
              "customer_sku": "1415956-15",
              "sku_id": 2032,
              "description": "T-SHIRT",
              "workflow_state": "production_hold"
            },
            {
              "id": 3344800,
              "customer_sku": "1415956-15",
              "sku_id": 2032,
              "description": "T-SHIRT",
              "workflow_state": "intake_hold"
            }
          ],
          "shipments": [
            {
              "shipping_carrier": "DHL",
              "shipping_method": "Smartmail Expedited",
              "tracking_number": "9374869903500930473876",
              "search_link": "https://webtrack.dhlglobalmail.com/?trackingnumber=9374869903500930473876",
              "delivered": false
            }
          ],
          "order_status_notes": [
            {
              "note": "Job 10315476 - 5000_RED_L on order in the following purchase order(s) | PO: 131622 - Arriving: 02/06/20 - From: Alpha Broder |",
              "created_at": "2020-02-05T11:53:08-08:00"
            }
          ],
          "service_requests": [
            {
              "reason": "Order status inquiry",
              "workflow_state": "open",
              "items_count": 1,
              "created_at": "2020-02-10T15:20:14-08:00"
            }
          ]
        }
        res.status(200).json(data)
      }
      catch (err) {
        res.status(500).json(errorMessage(err.message))
      }
      break
    default: 
      res.status(400).json(errorMessage("Invalid request"))
      break
  }
}

export default withApiAuthRequired(handler);