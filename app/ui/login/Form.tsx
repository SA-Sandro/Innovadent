'use client'
import PasswordField from "@/ui/login/PasswordField";
import Link from "next/link";
import { RiUserReceivedFill } from "react-icons/ri";
import { authenticate } from '@/lib/actions';
import { useFormState } from "react-dom";


export default function Form() {

  const [errorMessage, formAction, isPending] = useFormState(
    authenticate,
    undefined,
  );

  return (
    <form className="mt-8 space-y-6" action={formAction}>
      <div>
        <label className="text-gray-800 text-sm mb-2 block">Email <span className="text-red-500">*</span></label>
        <div className="relative flex items-center">
          <input
            name="email"
            type="text"
            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
            placeholder="Escribe tu email aquí"
          />
          <RiUserReceivedFill
            size={15}
            color="#bbb"
            className="absolute right-4 cursor-pointer"
          />
        </div>

      </div>

      <PasswordField
      />

      <div className="mt-8">
        <button
          type="submit"
          className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
        >
          Iniciar sesión
        </button>
        {errorMessage && (
          <>
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
      <p className="text-gray-800 text-sm mt-5 text-center">
        ¿Aún no tienes una cuenta?
        <Link
          href="/register"
          className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
        >
          Regístrate aquí
        </Link>
      </p>
    </form>
  );
}
