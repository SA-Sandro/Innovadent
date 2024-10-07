import z from "zod";
import {
  getParsedConfirmPassword,
  getParsedEmail,
  getParsedPassword,
  getParsedPhoto,
  getParsedUsername,
} from "@/lib/schemas";

export const checkUsername = (username: string): string[] | null => {
  const result = getParsedUsername(username);
  if (!result.success) {
    return result.error.errors.map((error) => error.message);
  }

  return null;
};

export const checkEmail = async (
  currentEmail: string
): Promise<string[] | null> => {
  try {
    const response = await fetch(
      `/api/getEmails?email=${encodeURIComponent(currentEmail)}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch emails from the database");
    }
    const emails = await response.json();
    const numberRows: number = emails.result.rowCount;

    const result = getParsedEmail(numberRows, currentEmail);

    if (!result.success) {
      return result.error.errors.map((error) => error.message);
    }

    return null;
  } catch (error) {
    console.error("Error checking email:", error);
    return null;
  }
};

export const checkPassword = (password: string): string[] | null => {
  const result = getParsedPassword(password);
  if (!result.success) {
    return result.error.errors.map((error) => error.message);
  }
  return null;
};

export const checkConfirmPassword = (
  firstInputPassword: string,
  confirmPassword: string
): string[] | null => {
  const result = getParsedConfirmPassword(confirmPassword, firstInputPassword);
  if (!result.success) {
    return result.error.errors.map((error) => error.message);
  }
  return null;
};

export const checkPhoto = (file: File) => {
  const result = getParsedPhoto(file);
  if (!result.success) {
    return result.error.errors.map((error) => error.message);
  }
  return null;
};
