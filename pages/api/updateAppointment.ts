import { updateAppointment, updateAppointmentState } from "@/lib/data";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, date, hour, state } = req.body;

  if (req.method === "PATCH" && date === undefined) {
    try {
      await updateAppointmentState(id as string);
      res
        .status(200)
        .json({ message: "The appointment state was updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to update the appointment state" });
    }
  }

  if (req.method === "PATCH" && date !== undefined) {
    try {
      await updateAppointment(id, date as Date, hour, state);
      res
        .status(200)
        .json({ message: "The appointment was updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to update the appointment" });
    }
  }
}
