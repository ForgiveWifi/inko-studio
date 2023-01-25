import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import errorMessage from "../../../lib/errorMesage"
import getStripeID from "../../../lib/getStripeID"
import stripe from "../../../lib/stripe"

async function handler(req,res) {

  const { method } = req
  const stripe_id = await getStripeID(req,res)

  switch (method) {
    case 'GET':
      try {
        const account = await stripe.customers.retrieve(stripe_id)
        res.status(200).json(account)
      }
      catch (err) {
        res.status(500).json(errorMessage(err.message))
      }
      break
    case 'POST':
      try {
        const { shipping, metadata } = req.body
        const {first_name, last_name, company} = metadata
        const update = {}
        const name = company ? company : (first_name && last_name) ? `${first_name} ${last_name}` : null 
        update.name = name
        update.metadata = metadata
        update.shipping = {
          name: name,
          address: shipping
        }
        const customer = await stripe.customers.update(
          stripe_id,
          update
        )
        res.status(200).json(customer)
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

export default withApiAuthRequired(handler)
