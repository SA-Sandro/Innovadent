import z from "zod";

const ACCEPTED_FILE_TYPES = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/webp",
];
const MAX_UPLOAD_SIZE = 1024 * 1024 * 3;
const REGEX = new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]{5,20}$");

export const checkUsername = (username: string): string[] | null => {
  const mySchema = z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must not exceed 20 characters long" });

  const result = mySchema.safeParse(username);
  if (!result.success) {
    return result.error.errors.map((error) => error.message);
  }

  return null;
};

export const checkEmail = (email: string): string[] | null => {
  const mySchema = z.string().email({ message: "Invalid email format" });
  const result = mySchema.safeParse(email);
  if (!result.success) {
    return result.error.errors.map((error) => error.message);
  }
  return null;
};

export const checkPassword = (password: string): string[] | null => {
  const mySchema = z
    .string()
    .min(5, { message: "Password must be at least 5 characters long. " })
    .max(15, { message: "Password must be at most 15 characters long. " })
    .regex(REGEX, {
      message:
        "Password should contain at least one digit, one uppercase and one lowercase. ",
    });
  const result = mySchema.safeParse(password);
  if (!result.success) {
    return result.error.errors.map((error) => error.message);
  }
  return null;
};

export const checkConfirmPassword = (
  firstInputPassword: string,
  confirmPassword: string
): string[] | null => {
  const mySchema = z
    .string()
    .refine((confirmPassword) => confirmPassword === firstInputPassword, {
      message: "Passwords do not match",
    });

  const result = mySchema.safeParse(confirmPassword);
  if (!result.success) {
    return result.error.errors.map((error) => error.message);
  }
  return null;
};

export const checkPhoto = (file: File) => {
  const mySchema = z
    .instanceof(File)
    .refine((f) => {
      return ACCEPTED_FILE_TYPES.includes(f.type);
    }, "Invalid extension. ")
    .refine((f) => {
      return f.size <= MAX_UPLOAD_SIZE;
    }, "File size must be less than 3MB. ");

  const result = mySchema.safeParse(file);
  if (!result.success) {
    return result.error.errors.map((error) => error.message);
  }
  return null;
};
