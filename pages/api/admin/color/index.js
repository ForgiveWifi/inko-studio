import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import errorMessage from "../../../../lib/errorMesage"
import getStripeID from "../../../../lib/getStripeID"
import prisma from "../../../../lib/prisma"

async function handler(req, res) {

  const { method, body } = req
  const stripe_id = await getStripeID(req, res)

  switch (method) {
    case "GET":
      try {
        const colors = await prisma.color.findMany({
          orderBy: {
            index: "asc"
          }
        })
        res.status(200).json(colors)
      }
      catch (err) {
        res.status(500).json(errorMessage(err.message))
      }
      break;
    case 'POST':
      try {
        const { name, hex, dark } = body
        const color = await prisma.color.create({
          data: {
            name: name,
            hex: hex,
            dark: dark
          }
        })
        res.status(201).json(color)
      }
      catch (err) {
        res.status(500).json(errorMessage(err.message))
      }
      break
    case "PATCH":
      try {
        const { color, name, hex, dark } = body
        const patch = await prisma.color.update({
          where: {
            id: color
          },
          data: {
            name: name,
            hex: hex,
            dark: dark
          }
        })
        res.status(200).json(patch)
      }
      catch (err) {
        res.status(500).json(errorMessage(err.message))
      }
      break
    case "DELETE":
      try {
        const { color } = body
        await prisma.color.delete({
          where: {
            id: color
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
