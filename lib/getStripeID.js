import { getAccessToken } from "@auth0/nextjs-auth0"

async function getStripeID(req,res) {
  const access_token = await getAccessToken(req,res)
  const payload = JSON.parse(Buffer.from(access_token.accessToken.split(".")[1], "base64").toString())
  return payload.stripe_id
  
}

export default getStripeID;