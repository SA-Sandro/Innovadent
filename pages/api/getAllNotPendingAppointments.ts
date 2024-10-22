import { getAllNotPendingAppointments } from "@/lib/data";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const allNotPendingAppointments = await getAllNotPendingAppointments();
      return res.status(200).json(allNotPendingAppointments);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to fetch the non-pending appointments" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
