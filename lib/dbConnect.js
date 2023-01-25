import mongoose from "mongoose"

const URI = process.env.MONGODB_URI

if (!URI) {
  throw new Error(
    "Please define the MONGODB_URI enviroment variable inside .env.local"
  )
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null}
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }
  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
    mongoose.set('strictQuery',false)
    cached.promise = mongoose.connect(URI, opts)
    .then(mongoose => {
      return mongoose 
    })
  }
  try {
    cached.conn = await cached.promise
  }
  catch (error) {
    cached.promise = null
    throw e
  }
  return cached.conn
}

export default dbConnect