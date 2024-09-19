"use client";

import PasswordField from "@/ui/Login/passwordField";
import { RiUserReceivedFill } from "react-icons/ri";

export default function Login() {
  return (
    <>
      <div className="flex flex-col justify-center items-center relative h-[90%] ">
        <div className="p-8 rounded-xl bg-gray-50 mx-4 sm:mx-2 shadow">
          <h2 className="text-gray-800 text-center text-2xl font-bold">
            Inicio de sesión
          </h2>
          <form className="mt-8 space-y-6">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email</label>
              <div className="relative flex items-center">
                <input
                  name="username"
                  type="email"
                  required
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  placeholder="Escribe tu email aquí"
                />
                <RiUserReceivedFill
                  size={15}
                  color="#bbb"
                  className="absolute right-4 cursor-pointer"
                />
              </div>
              <label className="text-xs font-mono text-red-500"></label>
            </div>

            <PasswordField />

            <div className="mt-8">
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
                href="/register"
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
