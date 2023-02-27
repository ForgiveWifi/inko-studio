import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import errorMessage from "../../../../lib/errorMesage"
import getStripeID from "../../../../lib/getStripeID"
import prisma from "../../../../lib/prisma"

async function handler(req, res) {

  const { method, query } = req
  const { size } = query
  const stripe_id = await getStripeID(req, res)

  switch (method) {
    case 'POST':
      try {
        const max = await prisma.size.aggregate({
          _max: {
            index: true
          }
        })
        const highest = max._max.index
        const new_size = await prisma.size.create({
          data: {
            size: size,
            index: highest === null ? 0 : highest + 1
          }
        })
        res.status(201).json(new_size)
      }
      catch (err) {
        console.log(err)
        res.status(500).json(errorMessage(err.message))
      }
      break
    case "DELETE":
      try {
        await prisma.size.delete({
          where: {
            size: size
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
