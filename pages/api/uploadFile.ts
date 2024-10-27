import { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";
import { IncomingForm, Files, File } from "formidable";
import path from "path";

const getUploadedFile = (files: Files): File | null => {
  const fileKey = Object.keys(files)[0];
  const file = files[fileKey] as File | File[];

  if (Array.isArray(file)) {
    return file[0];
  }
  return file;
};

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (req: NextApiRequest): Promise<File> => {
  const form = new IncomingForm({
    multiples: false,
    keepExtensions: true,
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }
      const file = getUploadedFile(files);
      resolve(file!);
    });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const file = await readFile(req);
    const result = await cloudinary.uploader.upload(file.filepath, {
      folder: "uploads",
      public_id: path.parse(file.originalFilename || "").name,
    });

    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.error("Error al subir a Cloudinary:", error);
    res.status(500).json({ message: "Error al subir el archivo" });
  }
}
