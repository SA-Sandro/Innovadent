import { updateAppointmentState, updateAppointment } from "@/lib/data";
import { NextApiRequest, NextApiResponse } from "next";
import { describe, expect, it, Mock, vi } from "vitest";
import handler from "../../../pages/api/updateAppointment";

vi.mock("@/lib/data", () => ({
  updateAppointmentState: vi.fn(),
  updateAppointment: vi.fn(),
}));

const createMockResponse = (): NextApiResponse => {
  const res: Partial<NextApiResponse> = {};
  res.status = vi.fn().mockReturnThis();
  res.json = vi.fn().mockReturnThis();
  return res as NextApiResponse;
};

describe("POST /api/updateAppointment handler", () => {
  it("should return 200 when method is PATCH and date is undefined", async () => {
    const req = {
      method: "PATCH",
      body: {
        id: "asfasd245dgsadga2",
      },
    } as NextApiRequest;
    const res = createMockResponse();

    (updateAppointmentState as Mock).mockResolvedValue("");

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "The appointment state was updated successfully",
    });
  });

  it("should return 200 when method is PATCH and date is NOT undefined", async () => {
    const req = {
      method: "PATCH",
      body: {
        id: "asfasd245dgsadga2",
        date: "",
        hour: "14:20",
        state: "pending",
      },
    } as NextApiRequest;

    const res = createMockResponse();

    (updateAppointment as Mock).mockResolvedValue("");

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "The appointment was updated successfully",
    });
  });
});
