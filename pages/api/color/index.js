import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import prisma from "../../../lib/prisma"
import errorMessage from "../../../lib/errorMesage"
import getStripeID from "../../../lib/getStripeID"
import stripe from "../../../lib/stripe"

async function handler(req, res) {

  const { method, query } = req
  const stripe_id = await getStripeID(req, res)

  switch (method) {
    case 'GET':
      try {
        const { sku } = query
        const list = await prisma.garment.findMany({
          where: {
            archived: false,
            stock: {
              gt: 0
            },
            style: { sku: sku },
          },
          distinct: ['color_id'],
          select: {
            color: true,
          },
          orderBy: [
            {
              color: {
                index: "asc"
              }
            }
          ]
        });
        // const list = await prisma.color.findMany({
        //   where: {
        //     Garment: {
        //       every: {
        //         style_id: sku
        //       }
        //     }
        //   },
        //   orderBy: [
        //     {
        //       index: "asc"
        //     }
        //   ]
        // })
        const colors = list.map(item => item.color)
        res.status(200).json(colors)
      }
      catch (err) {
        console.log(err)
        res.status(500).json(errorMessage(err.message))
      }
      break
    default:
      res.status(400).json(errorMessage("Invalid request"))
      break
  }
}

export default withApiAuthRequired(handler)
