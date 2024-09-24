'use client'

import { useState } from "react";
import EyeIcon from "../register/EyeIcon";

export default function PasswordField() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="text-gray-800 text-sm mb-2 block">
        Contraseña <span className="text-red-500">*</span>
      </label>
      <div className="relative flex items-center">
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          required
          className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
          placeholder="Escribe tu contraseña aquí"
        />
        <EyeIcon
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      </div>
      <label className="text-xs font-mono text-red-500"></label>
    </div>
  );
}
