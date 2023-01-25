import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import errorMessage from "../../../../lib/errorMesage"
import getStripeID from "../../../../lib/getStripeID"
import stripe from "../../../../lib/stripe"

async function handler(req,res) {

  const { method, query } = req
  const { id } = query
  const stripe_id = await getStripeID(req,res)

  switch (method) {
    case "PATCH":
      try {
         // if ("name, description, color, style,  different") {
      //   // change name is stripe and db
      // }
      // if ("sizes different") {
      //   // create or delete/archive in stripe and db
      // }
      // if ("list different") {
      //   // upload new previews 
      //   // upload images of files
      //   // change design in db
      // }
        console.log("editing:", id, req.body)

        res.status(200).json({ msg: "hello"})
      }
      catch (err) {
        res.status(500).json(errorMessage(err.message))
      }
      break
    case "DELETE":
      try {
        console.log("deleting:", id, req.body)
        // delete or archive is stripe and db
        res.status(200).json({ msg: "hello" })
      }
      catch (err) {
        res.status(500).json(errorMessage(err.message))
      }
      break;
    default: 
      res.status(400).json(errorMessage("Invalid request"))
      break
  }
}

export default withApiAuthRequired(handler);