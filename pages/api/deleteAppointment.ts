import { deleteAppointment } from "@/lib/data";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      await deleteAppointment(id as string);
      res
        .status(200)
        .json({ message: "The appointment was deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete the appointment" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
