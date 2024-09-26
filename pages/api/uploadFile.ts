import { IncomingForm, Files, File } from "formidable";
import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ensureUploadsDirExists = (dirPath: string): void => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const getUploadedFile = (files: Files): File | null => {
  const fileKey = Object.keys(files)[0];
  const file = files[fileKey] as File | File[];

  if (Array.isArray(file)) {
    return file[0];
  }
  return file;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const uploadsDir = path.join(process.cwd(), "public/uploads");
    ensureUploadsDirExists(uploadsDir);

    const form = new IncomingForm({
      uploadDir: uploadsDir,
      keepExtensions: true,
    });
    try {
      const fileName = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) {
            return reject(new Error("Error subiendo el archivo"));
          }

          const uploadedFile = getUploadedFile(files);

          if (!uploadedFile) {
            return reject(new Error("No se ha subido ningún archivo"));
          }

          const fileName = path.basename(uploadedFile.filepath);
          resolve(fileName);
        });
      });

      res.status(200).json({ fileName });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error de servidor" });
    }
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
