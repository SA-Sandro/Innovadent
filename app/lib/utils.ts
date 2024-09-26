import bcrypt from "bcryptjs";
import { FileName } from "./definitions";

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const fileUpload = async (
  formData: FormData
): Promise<FileName> => {
  try {
    const res = await fetch("/api/uploadFile", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error: ", errorData.message);
      throw new Error("Error uploading file: " + errorData.message); 
    }

    return await res.json();
  } catch (err) {
    console.error("Error al subir la imagen:", err);
    throw err; 
  }
};
