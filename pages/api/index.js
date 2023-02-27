import prisma from "../../lib/prisma";

async function handler(req, res) {
  await prisma.print.deleteMany()
  res.status(200).json({ message: "Welcome to the Inko Studios API!" });
}

export default handler;