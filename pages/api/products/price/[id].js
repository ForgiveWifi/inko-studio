
import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import errorMessage from "../../../../lib/errorMesage"
import getStripeID from "../../../../lib/getStripeID"
import stripe from "../../../../lib/stripe"

async function handler(req,res) {

  const { method } = req
  const stripe_id = await getStripeID(req,res)

  switch (method) {
    case "GET":
      try {
        const { id } = req.query
        const { metadata, default_price } = await stripe.products.retrieve(id)
        if (metadata.stripe_id !== stripe_id) {
          res.status(401).json(errorMessage("Unauthorized"))
          return
        }
        if (default_price) {
          const { unit_amount } = await stripe.prices.retrieve(default_price)
          res.status(200).json(unit_amount)
        } else {
          res.status(200).json(default_price)
        }
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