import { userRegistration } from "@/lib/data";
import { NextApiRequest, NextApiResponse } from "next";
import { describe, expect, it, Mock, vi } from "vitest";
import handler from "../../../pages/api/postUser";

vi.mock("@/lib/data", () => ({
  userRegistration: vi.fn(),
}));

const createMockResponse = (): NextApiResponse => {
  const res: Partial<NextApiResponse> = {};
  res.status = vi.fn().mockReturnThis();
  res.json = vi.fn().mockReturnThis();
  return res as NextApiResponse;
};

describe("POST /api/postUser handler", () => {
  it("should return 200 when method is POST", async () => {
    const req = {
      method: "POST",
      body: {
        username: "usuario",
        email: "usuario1@gmail.com",
        password: "caquita11A",
        image_url: "https://image-example.com",
      },
    } as NextApiRequest;
    const res = createMockResponse();

    (userRegistration as Mock).mockResolvedValue("");

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "User registered successfully",
      result: "",
    });
  });

  it("should return 405 when method is GET", async () => {
    const req = { method: "GET" } as NextApiRequest;
    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ error: "Method not allowed" });
  });
});
