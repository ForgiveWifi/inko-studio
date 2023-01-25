import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import dbConnect from "../../../lib/dbConnect"
import errorMessage from "../../../lib/errorMesage"
import getStripeID from "../../../lib/getStripeID"
import stripe from "../../../lib/stripe"
import Product from "../../../models/Product"
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('1234567890', 10)

async function handler(req,res) {

  await dbConnect()

  const { method } = req
  const stripe_id = await getStripeID(req,res)

  switch (method) {
    case 'GET':
      try {
        const page  = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        if (!(page && limit)) {
          return(res.status(400).json(errorMessage("Missing page index or limit")))
        }

        const startIndex = (page - 1) * limit

        const total = await Product.find({ account: stripe_id }).count()
        const results = {}
        results.pages = Math.ceil(total / limit)  
        results.data = await Product.find({ account: stripe_id}).sort({created_at: -1}).limit(limit).skip(startIndex).exec()
        res.status(200).json(results)
      }
      catch (err) {
        res.status(500).json(errorMessage(err.message))
      }
      break
    case 'POST':
      try {
        const {name, description, sizes, attributes, images, designs} = req.body
        const id = nanoid()
  
        const new_product = {
          images: images,
          metadata: {
            stripe_id: stripe_id,
            design_id: id,
            ...attributes,
          },
          shippable: true
        }
  
        if (description.length !== 0) {
          new_product.description = description
        }

        const ids = []

        for (let i = sizes.length - 1; i >= 0; i--) {
          new_product.name = `${name} - ${sizes[i]}`
          new_product.metadata.size = sizes[i]
          const { id } = await stripe.products.create(new_product)
          ids.unshift({ size: sizes[i], id: id})
        }

        await Product.create({
          _id: id,
          name: name,
          description: description || null,
          account: stripe_id, 
          sizes: ids, 
          color: attributes.color,
          style: attributes.style, 
          designs: designs, 
          images: images
        })
        res.status(200).json({message: "Success!"}) 
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
