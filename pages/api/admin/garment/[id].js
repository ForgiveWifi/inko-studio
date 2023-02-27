import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import errorMessage from "../../../../lib/errorMesage"
import getStripeID from "../../../../lib/getStripeID"
import prisma from "../../../../lib/prisma"

async function handler(req, res) {

  const { method, query } = req
  const { id } = query
  const stripe_id = await getStripeID(req, res)

  switch (method) {
    case 'PATCH':
      try {
        const { pallet, tags, price, stock, archived } = req.body
        const patch = await prisma.garment.update({
          where: {
            id: id
          },
          data: {
            pallet_id: pallet,
            tags_id: tags,
            price: price,
            stock: stock,
            archived: archived
          }
        })
        res.status(200).json(patch)
      }
      catch (err) {
        console.log(err)
        res.status(500).json(errorMessage(err.message))
      }
      break
    case "DELETE":
      try {
        await prisma.garment.delete({
          where: {
            id: id
          }
        })
        res.status(200).json({ message: "Deleted!" })
      }
      catch (err) {
        console.log(err)
        res.status(500).json(errorMessage(err.message))
      }
      break;
    default:
      res.status(400).json(errorMessage("Invalid request"))
      break
  }
}

export default withApiAuthRequired(handler)
