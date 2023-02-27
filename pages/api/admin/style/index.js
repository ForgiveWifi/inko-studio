import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import errorMessage from "../../../../lib/errorMesage"
import getStripeID from "../../../../lib/getStripeID"
import prisma from "../../../../lib/prisma"

async function handler(req, res) {

  const { method } = req
  const stripe_id = await getStripeID(req, res)

  switch (method) {
    case "GET":
      try {
        const styles = await prisma.style.findMany({
          orderBy: {
            index: "asc"
          }
        })
        res.status(200).json(styles)
      }
      catch (err) {
        console.log(err)
        res.status(500).json(errorMessage(err.message))
      }
      break;
    case 'POST':
      try {
        const max = await prisma.style.aggregate({
          _max: {
            index: true
          }
        })
        const highest = max._max.index

        const { sku, name, description, brand, type, front_image, back_image, width, height, scale, front_offset, back_offset
        } = req.body
        const style = await prisma.style.create({
          data: {
            sku: sku,
            index: highest === null ? 0 : highest + 1,
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
            back_offset: back_offset
          }
        })
        res.status(200).json(style)
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
