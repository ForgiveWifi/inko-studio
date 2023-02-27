import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import errorMessage from "../../../../lib/errorMesage"
import getStripeID from "../../../../lib/getStripeID"
import prisma from "../../../../lib/prisma"

async function handler(req, res) {

  const { method, query, body } = req
  const stripe_id = await getStripeID(req, res)

  switch (method) {
    case "GET":
      try {
        const { sku, color } = query
        console.log(sku, color)
        if (!sku || !color) {
          const sizes = await prisma.size.findMany({
            orderBy: {
              index: "asc"
            }
          });
          res.status(200).json(sizes)
        } else {
          console.log("style", sku)
          const list = await prisma.garment.findMany({ where: { style_id: sku, color_id: color }, select: { size_id: true } });
          const garments = list.map(garment => garment.size_id)
          const all_sizes = await prisma.size.findMany({ orderBy: { index: "asc" } });
          const sizes = all_sizes.filter(size => !garments.includes(size.size));
          res.status(200).json(sizes)
        }
      }
      catch (err) {
        console.log(err)
        res.status(500).json(errorMessage(err.message))
      }
      break;
    case "PATCH":
      try {
        const { size, index } = body
        const patch = await prisma.size.update({
          where: {
            size: size
          },
          data: {
            index: index
          }
        })
        res.status(200).json(patch)
      }
      catch (err) {
        console.log(err)
        res.status(500).json(errorMessage(err.message))
      }
    default:
      res.status(400).json(errorMessage("Invalid request"))
      break
  }
}

export default withApiAuthRequired(handler)
