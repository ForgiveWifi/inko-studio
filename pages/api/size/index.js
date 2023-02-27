import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import prisma from "../../../lib/prisma"
import errorMessage from "../../../lib/errorMesage"

async function handler(req, res) {

  const { method, query } = req

  switch (method) {
    case 'GET':
      try {
        const { sku, color } = query
        const sizes = await prisma.garment.findMany({
          where: {
            archived: false,
            stock: {
              gt: 0
            },
            ...(sku ? { style: { sku: sku } } : {}),
            ...(color ? { color_id: color } : {})
          },
          select: {
            size_id: true,
            tags: {
              select: {
                id: true
              }
            }
          },
          distinct: ['size_id'],
          orderBy: {
            size: {
              index: "asc"
            }
          }
        })
        res.status(200).json(sizes)
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
