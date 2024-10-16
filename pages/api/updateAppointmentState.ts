import { updateAppointmentState } from "@/lib/data";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    const { id } = req.body;
    try {
      await updateAppointmentState(id as string);
      res
        .status(200)
        .json({ message: "The appointment was updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to update the appointment" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
