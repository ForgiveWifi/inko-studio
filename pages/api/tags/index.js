import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import dbConnect from "../../../lib/dbConnect"
import errorMessage from "../../../lib/errorMesage"
import getStripeID from "../../../lib/getStripeID"
import Tag from "../../../models/Tag"

const sizes = ["S", "M", "L", "XL"]

async function handler(req,res) {

  await dbConnect()

  const { method } = req
  const stripe_id = await getStripeID(req,res)

  switch (method) {
    case 'GET':
      try {
        const tags = await Tag.findById(stripe_id)
        if (tags) {
          const sorted = tags.tags.sort((a, b) => sizes.indexOf(a.size) - sizes.indexOf(b.size))
          res.status(200).json(sorted)
        } else {
          const new_tag = await Tag.create({ _id: stripe_id, tags:[]})
          res.status(200).json(new_tag)
        }
      }
      catch (err) {
        res.status(500).json(errorMessage(err.message))
      }
      break
    case 'POST':
      try {
        const tags = await Tag.updateOne(
          { _id: stripe_id },
          { $addToSet: { tags: req.body }}
        )
        res.status(201).json(tags)
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
