import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import errorMessage from "../../../lib/errorMesage"
import getStripeID from "../../../lib/getStripeID"
import prisma from "../../../lib/prisma"

async function handler(req, res) {

  const { method, query } = req
  const { id } = query
  const stripe_id = await getStripeID(req, res)

  switch (method) {
    case "PATCH":
      try {
        const { design } = req.body
        const { design_id } = await prisma.tag.findUnique({
          where: {
            id: id
          },
          select: {
            design_id: true
          }
        })
        console.log(design_id)
        const tag = await prisma.design.update({
          where: {
            id: design_id
          },
          data: {
            ...design
          }
        })
        res.status(200).json(design_id)
      }
      catch (err) {
        console.log(err)
        res.status(500).json(errorMessage(err.message))
      }
      break
    case "DELETE":
      try {
        await prisma.tag.delete({
          where: {
            id: id
          }
        })
        res.status(200).json({ message: "Deleted!" })
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