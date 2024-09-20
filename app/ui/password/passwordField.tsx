"use client";

import { ReactElement, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

type PasswordProp = {
  labelName:string
}

export default function PasswordField({ labelName }: PasswordProp): ReactElement {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="text-gray-800 text-sm mb-2 block">{labelName}</label>
      <div className="relative flex items-center">
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          required
          className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
          placeholder="Escribe tu contraseña aquí"
        />
        <EyeIcon />
      </div>
      <label className="text-xs font-mono text-red-500"></label>
    </div>
  );

  function EyeIcon(): ReactElement {
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
}
