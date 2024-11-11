import { getEmailsByEmail } from "@/lib/data";
import { NextApiRequest, NextApiResponse } from "next";
import { describe, expect, it, Mock, vi } from "vitest";
import handler from "../../../pages/api/getEmails";

vi.mock("@/lib/data", () => ({
  getEmailsByEmail: vi.fn(),
}));

const createMockResponse = (): NextApiResponse => {
  const res: Partial<NextApiResponse> = {};
  res.status = vi.fn().mockReturnThis();
  res.json = vi.fn().mockReturnThis();
  return res as NextApiResponse;
};

describe("GET /api/getEmails handler", () => {
  it("should return 200 when method is GET", async () => {
    const req = {
      method: "GET",
      query: { email: "usuario@gmail.com" },
    } as unknown as NextApiRequest;
    const res = createMockResponse();

    (getEmailsByEmail as Mock).mockResolvedValue("usuario@gmail.com");

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "All emails were successfully obtained",
      result: "usuario@gmail.com",
    });
  });

  it("should return 405 when method is POST", async () => {
    const req = { method: "POST" } as NextApiRequest;
    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ error: "Method not allowed" });
  });
});
