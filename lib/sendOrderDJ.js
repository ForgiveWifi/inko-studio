import axios from "axios"

async function sendOrderDJ({purchase_order, ship_to, ship_provider, lines}) {

  const order = {
    "type": "order",
    "account_id": process.env.DREAM_JUNCTION_API_ACCOUNT_ID,
    "account_zip": process.env.DREAM_JUNCTION_API_ACCOUNT_ZIP,
    "purchase_order": purchase_order,
    "garments_provided": false,
    "ship_provider": ship_provider,
    "ship_to": ship_to,
    "ship_from": {
      "company_name": "inko studios",
      "address": "15708 San Solano Ct",
      "address_2": "",
      "city": "Austin",
      "state": "TX",
      "zip_code": "78738",
      "country": "US"
    },
    "production_priority": "normal",
    "items": lines
  }
  
  const res = await axios.post(`${process.env.DREAM_JUNCTION_API}/v3/orders`, order, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token token=${process.env.DREAM_JUNCTION_API_KEY}`
    }
  })
  return res
}

export default sendOrderDJ