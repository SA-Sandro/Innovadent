import { getUserAppointments } from "@/lib/data";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { email } = req.query;
      const appointments = await getUserAppointments(email as string);
      return res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch appointments" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
