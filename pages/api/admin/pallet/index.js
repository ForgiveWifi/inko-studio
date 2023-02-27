import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import { HeightTwoTone } from "@mui/icons-material"
import errorMessage from "../../../../lib/errorMesage"
import getStripeID from "../../../../lib/getStripeID"
import prisma from "../../../../lib/prisma"

async function handler(req, res) {

  const { method, query, body } = req
  const stripe_id = await getStripeID(req, res)

  switch (method) {
    case "GET":
      try {
        const { type } = query
        const pallets = await prisma.pallet.findMany({
          where: {
            ...(type ? { type: type } : {})
          },
          orderBy: [
            {
              printer: {
                id: "asc"
              }
            },
            {
              width: "asc"
            }
          ]
        })
        res.status(200).json(pallets)
      }
      catch (err) {
        console.log(err)
        res.status(500).json(errorMessage(err.message))
      }
      break;
    case 'POST':
      try {
        console.log(req.body)
        const { name, printer, type, width, height } = body
        const pallet = await prisma.pallet.create({
          data: {
            name: name,
            printer: {
              connect: {
                id: printer
              }
            },
            type: type,
            width: width,
            height: height
          }
        })
        console.log(pallet)
        res.status(201).json(pallet)
      }
      catch (err) {
        console.log(err)
        res.status(500).json(errorMessage(err.message))
      }
      break
    case "DELETE":
      try {
        const { pallet } = req.body
        console.log(pallet)
        await prisma.pallet.delete({
          where: {
            id: pallet
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
