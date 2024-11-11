import { getEmailsByEmail } from "@/lib/data";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { email } = req.query;
      console.log(email)
      const result = await getEmailsByEmail(email as string);
      res
        .status(200)
        .json({ message: "All emails were successfully obtained", result });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch emails" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
