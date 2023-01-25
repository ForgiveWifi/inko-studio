import stripeCLI from "stripe";
import stripe from "../../lib/stripe";
import { buffer } from "micro"
import sendOrderDJ from "../../lib/sendOrderDJ"

export const config = {
  api: {
      bodyParser: false,
  },
};

async function handler(req,res) {

  const { method } = req

  switch (method) {
    case "POST":
      try {
        const buf = await buffer(req)
        const sig = req.headers['stripe-signature'];
        let event;
        event = stripeCLI.webhooks.constructEvent(buf, sig, process.env.ENDPOINT_SECRET);
        switch (event.type) {
          case 'invoice.paid':
            try {
              const invoice = event.data.object;
              console.log("invoice", invoice)
              const { id, customer, customer_shipping, lines } = invoice 
              const { metadata } = await stripe.customers.retrieve(customer)
              const { shipping_provider, first_name, last_name, company_name } = metadata
              console.log("purchase order:", id)
              console.log("shipping:", customer_shipping)
              console.log("shipping_provider:", shipping_provider)
              console.log("lines:", lines)
              // const order = await sendOrderDJ(id, customer_shipping, meta_data.shipping_provider, lines)
              console.log("done")
            }
            catch (err) {
              res.status(400).send(`Webhook Error: ${err.message}`);
            }
            break;
          default:
            console.log(`Unhandled event type ${event.type}`);
        }
        res.send()
      }
      catch (err) {
        console.log(err.message)
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
      break
    default: 
      res.status(400).json(errorMessage("Invalid request"))
      break
  }
}

export default handler