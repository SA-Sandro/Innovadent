import { describe, expect, it, vi, Mock } from "vitest";
import handler from "../../../pages/api/uploadFile"; 
import { v2 as cloudinary } from "cloudinary";
import { NextApiRequest, NextApiResponse } from "next";

vi.mock("cloudinary", async (importOriginal) => {
  const actual = await importOriginal(); 
  return {
    actual,
    v2: {
      ...actual.v2, 
      uploader: {
        upload: vi.fn(), 
      },
    },
  };
});

vi.mock("formidable", () => ({
  IncomingForm: vi.fn().mockImplementation(() => ({
    parse: vi.fn((req, callback) => {
      callback(
        null,
        {},
        {
          file: {
            filepath: "/path/to/file.jpg",
            originalFilename: "file.jpg",
          },
        }
      );
    }),
  })),
}));

const createMockRequest = () => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  } as unknown as NextApiRequest;
};

const createMockResponse = (): NextApiResponse => {
  const res: Partial<NextApiResponse> = {};
  res.status = vi.fn().mockReturnThis();
  res.json = vi.fn().mockReturnThis();
  return res as NextApiResponse;
};

describe("POST /api/uploadFile handler", () => {
  it("should return 200 and URL when file is uploaded successfully", async () => {
    const mockUrl =
      "https://res.cloudinary.com/demo/image/upload/v1234567/file.jpg";
    (cloudinary.uploader.upload as Mock).mockResolvedValue({
      secure_url: mockUrl,
    });

    const req = createMockRequest();
    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ url: mockUrl });
  });

  it("should return 500 when there is an error uploading the file", async () => {
    (cloudinary.uploader.upload as Mock).mockRejectedValue(
      new Error("Error al subir")
    );

    const req = createMockRequest();
    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error al subir el archivo",
    });
  });

  it("should return 405 if the method is not POST", async () => {
    const req = { method: "GET" } as unknown as NextApiRequest;
    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ message: "Método no permitido" });
  });
});
