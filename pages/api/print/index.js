import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import errorMessage from "../../../lib/errorMesage"
import getStripeID from "../../../lib/getStripeID"
import stripe from "../../../lib/stripe"
import { customAlphabet } from 'nanoid'
import prisma from "../../../lib/prisma"

const nanoid = customAlphabet('1234567890', 10)

async function handler(req, res) {

  const { method } = req
  const stripe_id = await getStripeID(req, res)

  switch (method) {
    case 'GET':
      try {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        if (!(page && limit)) {
          return (res.status(400).json(errorMessage("Missing page index or limit")))
        }

        const startIndex = (page - 1) * limit

        const total = await prisma.print.count({ where: { account: stripe_id } })
        const results = {}
        results.pages = Math.ceil(total / limit)
        results.data = await prisma.print.findMany({
          where: {
            account: stripe_id
          },
          select: {
            name: true,
            description: true,
            product: {
              select: {
                garment: {
                  select: {
                    color: true,
                    size_id: true,
                    style: {
                      select: {
                        sku: true,
                        name: true
                      }
                    }
                  }
                },
                stripe: true
              },
              orderBy: [
                {
                  garment: {
                    size: {
                      index: "asc"
                    }
                  }
                }
              ]
            },
            design: {
              include: {
                image: {
                  select: {
                    art_file: true,
                    art_url: true
                  }
                }
              },
              orderBy: [
                {
                  placement: "desc"
                }
              ]
            },
            images: true,
            created_at: true
          },
          orderBy: [
            {
              created_at: "desc"
            }
          ],
          skip: startIndex,
          take: limit
        })
        res.status(200).json(results)
      }
      catch (err) {
        console.log(err)
        res.status(500).json(errorMessage(err.message))
      }
      break
    case 'POST':
      try {
        const { name, description, sizes, color, style, images, designs, pallet } = req.body

        let design_ids = []

        await prisma.$transaction(async (prisma) => {
          for (let i = 0; i < designs.length; i++) {
            try {
              const { placement, art_file, art_url, thumbnail_url, width, height, x_offset, y_offset } = designs[i]
              const { id: image_id } = await prisma.image.create({
                data: {
                  account: stripe_id,
                  art_file: art_file,
                  art_url: art_url
                }
              });
              const { id: design_id } = await prisma.design.create({
                data: {
                  placement: placement,
                  image: {
                    connect: {
                      id: image_id
                    }
                  },
                  thumbnail_url: thumbnail_url,
                  width: width,
                  height: height,
                  x_offset: x_offset,
                  y_offset: y_offset
                }
              });
              design_ids.push(design_id);
            } catch (error) {
              throw error
            }
          }
        });

        const { id: print_id } = await prisma.print.create({
          data: {
            account: stripe_id,
            name: name,
            description: description,
            images: images,
            design: {
              connect: design_ids.map((id) => ({
                id: id,
              })),
            },
            width: pallet.width,
            height: pallet.height
          }
        })

        const new_product = {
          images: images,
          metadata: {
            customer: stripe_id,
            print: print_id,
            style: style,
            color: color.name,
          },
          shippable: true
        }

        if (description.length !== 0) {
          new_product.description = description
        }

        let product_ids = []

        for (let i = sizes.length - 1; i >= 0; i--) { // fix
          const sku = nanoid()
          new_product.name = `${name} - ${sizes[i]}`
          new_product.metadata.size = sizes[i]
          new_product.metadata.sku = sku
          product_ids.push(sku)
          const { id } = await stripe.products.create(new_product)
          const { id: garment_id } = await prisma.garment.findFirstOrThrow({
            where: {
              size_id: sizes[i],
              color_id: color.id,
              style_id: style
            },
            select: {
              id: true
            }
          })
          await prisma.product.create({
            data: {
              sku: sku,
              stripe: id,
              account: stripe_id,
              images: images,
              garment: {
                connect: {
                  id: garment_id
                }
              },
              print: {
                connect: {
                  id: print_id
                }
              },
              // tag: { // fix
              //   connet: {
              //     id: tag_id 
              //   }
              // }
            }
          })
        }
        await prisma.print.update({
          where: {
            id: print_id
          },
          data: {
            product: {
              connect: product_ids.map(id => ({
                sku: id
              }))
            },
          }
        })
        res.status(201).json({ message: "Success!" })
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
