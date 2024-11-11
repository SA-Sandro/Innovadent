import { getAllNotPendingAppointments } from "@/lib/data";
import { AppointmentData } from "@/lib/definitions";
import { NextApiRequest, NextApiResponse } from "next";
import { describe, expect, it, Mock, vi } from "vitest";
import handler from "../../../pages/api/getAllNotPendingAppointments";

 const mockData: AppointmentData[] = [
   {
     id: "456",
     username: "Jane Smith",
     user_email: "janesmith@example.com",
     image_url: "https://example.com/image2.jpg",
     appointment_reason: "Follow-up",
     date: new Date("2023-12-12T14:00:00Z"),
     hour: "14:00",
     state: "pending",
   },
 ];

vi.mock("@/lib/data", () => ({
  getAllNotPendingAppointments: vi.fn(),
}));

const createMockResponse = (): NextApiResponse => {
  const res: Partial<NextApiResponse> = {};
  res.status = vi.fn().mockReturnThis();
  res.json = vi.fn().mockReturnThis();
  return res as NextApiResponse;
};

describe("GET /api/getAllNotPendingAppointments handler", () => {
  it("should return 200 when method is GET", async () => {
    const req = { method: "GET" } as NextApiRequest;
    const res = createMockResponse();

    (getAllNotPendingAppointments as Mock).mockResolvedValue(mockData);

    await handler(req,res);

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(mockData)
  });

  it("should return 405 when method is POST", async () => {
    const req = { method: "POST" } as NextApiRequest;
    const res = createMockResponse();

    (getAllNotPendingAppointments as Mock).mockResolvedValue(mockData);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({error: "Method not allowed"});
  });
});
