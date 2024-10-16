import { getAllUsersAppointment } from "@/lib/data";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const allUsersAppointment = await getAllUsersAppointment();
      return res.status(200).json(allUsersAppointment);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch appointments" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
