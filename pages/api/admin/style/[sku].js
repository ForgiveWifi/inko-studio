import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import errorMessage from "../../../../lib/errorMesage"
import prisma from "../../../../lib/prisma"

async function handler(req, res) {

  const { method, query } = req
  const { sku } = query

  switch (method) {
    case "PATCH":
      try {
        const { name, description, brand, type, front_image, back_image, width, height, scale, front_offset, back_offset } = req.body
        const style = await prisma.style.update({
          where: {
            sku: sku
          },
          data: {
            name: name,
            description: description,
            brand: brand,
            type: type,
            front_image: front_image,
            back_image: back_image,
            width: width,
            height: height,
            scale: scale,
            front_offset: front_offset,
            back_offset: back_offset,
          }
        })
        res.status(200).json(style)
      }
      catch (err) {
        res.status(500).json(errorMessage(err.message))
      }
      break;
    case 'DELETE':
      try {
        const style = await prisma.style.delete({
          where: {
            sku: sku
          }
        })
        res.status(200).json(style)
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
