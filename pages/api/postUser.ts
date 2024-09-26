import { userRegistration } from "@/lib/data";
import { hashPassword } from "@/lib/utils";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { username, email, password, image_url } = req.body;
      const hashedPassword = await hashPassword(password);

      const result = await userRegistration(
        username,
        email,
        hashedPassword,
        image_url
      );
      res.status(200).json({ message: "User registered successfully", result });
    } catch (error) {
      res.status(500).json({ error: "User registration failed" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
