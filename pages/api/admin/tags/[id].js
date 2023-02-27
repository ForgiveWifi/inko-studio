import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import errorMessage from "../../../../lib/errorMesage"
import getStripeID from "../../../../lib/getStripeID"
import prisma from "../../../../lib/prisma"

async function handler(req, res) {

  const { method, query } = req
  const { id } = query
  const stripe_id = await getStripeID(req, res)

  switch (method) {
    case "DELETE":
      try {
        await prisma.tags.delete({
          where: {
            id: id
          }
        })
        res.status(200).json({ message: "Deleted!" })
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

export default withApiAuthRequired(handler)
