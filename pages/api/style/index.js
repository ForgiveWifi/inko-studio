import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import prisma from "../../../lib/prisma"
import errorMessage from "../../../lib/errorMesage"

async function handler(req, res) {

  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const styles = await prisma.style.findMany({
          select: {
            sku: true,
            name: true,
            type: true,
            width: true,
            height: true,
            scale: true,
            front_offset: true,
            back_offset: true,
            front_image: true,
            back_image: true
          },
          orderBy: {
            index: "asc"
          }
        })
        res.status(200).json(styles)
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
