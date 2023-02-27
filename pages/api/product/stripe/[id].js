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
        const product = await stripe.products.retrieve(id)
        if (product.metadata.stripe_id !== stripe_id) {
          res.status(401).json(errorMessage("Unauthorized"))
          return
        }
        if (product) {
          res.status(200).json(product)
        } else { 
          res.status(404).json(errorMessage("Not Found"))
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