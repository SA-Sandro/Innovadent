export const AVAILABLE_HOURS = [
  "09:00:00",
  "10:00:00",
  "11:00:00",
  "12:00:00",
  "13:00:00",
  "14:00:00",
  "15:00:00",
  "16:00:00",
  "17:00:00",
];

export const ACCEPTED_FILE_TYPES = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/webp",
];

export const MAX_UPLOAD_SIZE = 1024 * 1024 * 3;
export const REGEX = new RegExp(
  "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]{5,20}$"
);

export const DEFAULT_IMAGE_URL: string = "/images/default.png";

