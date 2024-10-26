import { EyeIconProps } from "@/lib/definitions";
import { ReactElement } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export default function EyeIcon({
  showPassword,
  setShowPassword,
}: EyeIconProps): ReactElement {
  const togglePasswordVisibility = (): void => {
    setShowPassword((prevState) => !prevState);
  };

  return showPassword ? (
    <IoEyeOffOutline
      color="#bbb"
      size={15}
      className="absolute right-4 cursor-pointer"
      onClick={togglePasswordVisibility}
    />
  ) : (
    <IoEyeOutline
      color="#bbb"
      size={15}
      className="absolute right-4 cursor-pointer"
      onClick={togglePasswordVisibility}
    />
  );
}
