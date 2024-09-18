"use client";

import { RiUserReceivedFill } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (): void => {
    setShowPassword((prevState) => !prevState);
  };

  function EyeIcon() {
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

  return (
    <>
      <div className="w-[25rem] bg-gray-50 relative">
        <div className="p-8 rounded-2xl bg-white shadow">
          <h2 className="text-gray-800 text-center text-2xl font-bold">
            Inicio de sesión
          </h2>
          <form className="mt-8 space-y-6">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Nombre de usuario
              </label>
              <div className="relative flex items-center">
                <input
                  name="username"
                  type="text"
                  required
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  placeholder="Enter user name"
                />
                <RiUserReceivedFill
                  size={15}
                  color="#bbb"
                  className="absolute right-4 cursor-pointer"
                />
              </div>
              <label className="text-xs font-mono text-red-500"></label>
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Contraseña
              </label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  placeholder="Enter password"
                />

                <EyeIcon />
              </div>
              <label className="text-xs font-mono text-red-500"></label>
            </div>

            <div className="!mt-8">
              <button
                type="button"
                className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Iniciar sesión
              </button>
            </div>
            <p className="text-gray-800 text-sm !mt-8 text-center">
              ¿Aún no tienes una cuenta?
              <a
                href="#"
                className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
              >
                Regístrate aquí
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
