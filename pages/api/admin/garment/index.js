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
        const page = parseInt(query.page)
        const limit = parseInt(query.limit)

        if (!(page && limit)) {
          return (res.status(400).json(errorMessage("Missing page index or limit")))
        }

        const { style, color, size } = query

        const total = await prisma.garment.count({
          where: {
            ...(color ? { color_id: color } : {}),
            ...(style ? { style_id: style } : {}),
            ...(size ? { size_id: size } : {}),
          }
        })

        const garments = await prisma.garment.findMany({
          where: {
            ...(color ? { color_id: color } : {}),
            ...(style ? { style_id: style } : {}),
            ...(size ? { size_id: size } : {}),
          },
          include: {
            color: {
              select: {
                name: true,
                hex: true
              }
            },
            style: {
              select: {
                name: true,
                front_image: true,
                back_image: true
              }
            },
            pallet: {
              select: {
                name: true
              }
            }
          },
          orderBy: [
            {
              archived: "asc"
            },
            {
              style_id: "desc",
            },
            {
              color: {
                index: "asc"
              }
            },
            {
              size: {
                index: "asc"
              }
            }],
          skip: (page - 1) * limit,
          take: limit
        })
        const results = {
          garments: garments,
          total: Math.ceil(total / limit)
        }
        res.status(200).json(results)
      }
      catch (err) {
        console.log(err)
        res.status(500).json(errorMessage(err.message))
      }
      break;
    case 'POST':
      try {
        const { sku, color, size } = body

        for (let i = 0; i < size.length; i++) {
          const garment = await prisma.garment.create({
            data: {
              style: {
                connect: {
                  sku: sku
                }
              },
              color: {
                connect: {
                  id: color
                }
              },
              size: {
                connect: {
                  size: size[i].size
                }
              },
              pallet: {
                connect: {
                  id: size[i].pallet
                }
              },
              price: size[i].price,
              ...(size[i].tag ? { tags: { connect: { id: size[i].tag } } } : {})
            }
          })
          console.log(garment)
        }
        res.status(201).json({ message: "Success" })
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
