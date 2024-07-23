// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await res.revalidate(`/en/${req.query['route']}`)
  } catch (err) {
    return res.json({ message: JSON.stringify(err) })
  }
  return res.json({ message: 'it happened' })
}
