import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import errorMessage from "../../../../lib/errorMesage"
import prisma from "../../../../lib/prisma"

async function handler(req, res) {

  const { method, body } = req

  switch (method) {
    case "GET":
      try {
        const printers = await prisma.printer.findMany({
          orderBy: {
            index: "asc"
          }
        })
        res.status(200).json(printers)
      }
      catch {
        console.log(err)
        res.status(500).json(errorMessage(err.message))
      }
      break;
    case 'POST':
      try {
        const { name } = body
        const printer = await prisma.printer.create({
          data: {
            name: name
          }
        })
        res.status(201).json(printer)
      }
      catch (err) {
        console.log(err)
        res.status(500).json(errorMessage(err.message))
      }
      break
    case "DELETE":
      try {
        res.status(200).json({ message: "Deleted!" })
      }
      catch (err) {
        console.log(err)
        res.status(500).json(errorMessage(err.message))
      }
      break;
    default:
      res.status(400).json(errorMessage("Invalid request"))
      break
  }
}

export default withApiAuthRequired(handler)
