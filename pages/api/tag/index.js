import { withApiAuthRequired } from "@auth0/nextjs-auth0"

import errorMessage from "../../../lib/errorMesage"
import getStripeID from "../../../lib/getStripeID"
import prisma from "../../../lib/prisma"

async function handler(req, res) {

  const { method, body } = req
  const stripe_id = await getStripeID(req, res)

  switch (method) {
    case 'GET':
      try {
        const tags = await prisma.tag.findMany({
          where: {
            account: stripe_id
          },
          select: {
            id: true,
            design: {
              select: {
                image: true,
                width: true,
                height: true
              }
            },
            tags: {
              select: {
                size_id: true,
                pallet: {
                  select: {
                    width: true,
                    height: true
                  }
                }
              }
            }
          },
          orderBy: [
            {
              tags: {
                size: {
                  index: "asc"
                }
              }
            },
            {
              tags: {
                pallet: {
                  width: "asc"
                }
              }
            }
          ]
        })
        res.status(200).json(tags)
      }
      catch (err) {
        console.log(err)
        res.status(500).json(errorMessage(err.message))
      }
      break
    case 'POST':
      try {
        console.log(body)
        const { tags, design } = body
        const tag = await prisma.tag.create({
          data: {
            account: stripe_id,
            design: {
              create: design
            },
            tags: {
              connect: {
                id: tags
              }
            }
          }
        })
        res.status(201).json(tag)
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
