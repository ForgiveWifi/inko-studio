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
        const limit = parseInt(req.query.limit)
        const { starting_after, ending_before } = req.query
        
        const query = {
          customer: stripe_id,
          limit: limit,
        }
        if (starting_after) {
          query.starting_after = starting_after
        }
        if (ending_before) {
          query.ending_before = ending_before
        }
        const invoice = await stripe.invoices.list(query)
        res.status(200).json(invoice)
      }
      catch (err) {
        res.status(500).json(errorMessage(err.message))
      }
      break
    // case 'POST':
    //   try {
    //     const { description } = req.body
    //     const customer_id = req.auth.stripe_id
    //     const invoice = {
    //       customer: customer_id,
    //     }
    //     const res = await stripe.invoices.create(invoice)
    //     res.status(200).json(res)
    //   }
    //   catch (err) {
    //     res.status(500).json(errorMessage(err.message))
    //   }
    //   break
    default:
      res.status(400).json(errorMessage("Invalid request"))
      break
  }
}

export default withApiAuthRequired(handler)
