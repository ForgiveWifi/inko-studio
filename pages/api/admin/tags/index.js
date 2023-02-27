import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import errorMessage from "../../../../lib/errorMesage"
import getStripeID from "../../../../lib/getStripeID"
import prisma from "../../../../lib/prisma"

async function handler(req, res) {

  const { method, query, body } = req
  const stripe_id = await getStripeID(req, res)

  switch (method) {
    case "GET":
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
        console.log(err)
        res.status(500).json(errorMessage(err.message))
      }
      break;
    case "POST":
      try {
        const { size, pallet } = body
        const tag = await prisma.tags.create({
          data: {
            size: {
              connect: {
                size: size
              }
            },
            pallet: {
              connect: {
                id: pallet
              }
            }
          }
        })
        res.status(200).json(tag)
      }
      catch (err) {
        console.log(err)
        res.status(500).json(errorMessage(err.message))
      }
    default:
      res.status(400).json(errorMessage("Invalid request"))
      break
  }
}

export default withApiAuthRequired(handler)
