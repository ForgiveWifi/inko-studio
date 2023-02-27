import { withApiAuthRequired } from "@auth0/nextjs-auth0"

import errorMessage from "../../../lib/errorMesage"
import getStripeID from "../../../lib/getStripeID"
import prisma from "../../../lib/prisma"

async function handler(req, res) {

  const { method, body } = req
  const stripe_id = await getStripeID(req, res)

  switch (method) {
    case 'GET':
      try {
        const tags = await prisma.tags.findMany({
          include: {
            pallet: true
          },
          orderBy: [
            {
              size: {
                index: "asc"
              }
            },
            {
              pallet: {
                width: "asc"
              }
            }
          ]
        })
        res.status(200).json(tags)
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
