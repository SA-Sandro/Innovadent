"use client";

import { loginAction } from "@/lib/actions";
import { initialState, SessionData, stateType } from "@/lib/definitions";
import Link from "next/link";
import { useState, useEffect } from "react";
import { RiUserReceivedFill } from "react-icons/ri";
import ButtonLoader from "../ButtonLoader";
import { useSession } from "@/context/SessionContext";
import { useRouter } from "next/navigation";
import PasswordField from "./PasswordField";

export default function Form() {

  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState<stateType>(initialState);
  const { setSession } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (state.error !== "") {
      setIsLoading(false);
    }
  }, [state]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const result = await loginAction(state, formData);

    if (result.error) {
      setState({ ...state, error: result?.error });
    } else {
      setState(initialState);
      setSession({
        isLoggedIn: result.session?.isLoggedIn,
        role: result.session?.role,
        image_url: result.session?.image_url,
        userName: result.session?.userName
      } as SessionData)
      router.push('/')
    }
    setIsLoading(false);
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="text-gray-800 text-sm mb-2 block">
          Email <span className="text-red-500">*</span>
        </label>
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

      <PasswordField />

      <div className="mt-8">
        <button
          type="submit"
          className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
        >
          {isLoading === false ? "Inicia la sesión" : <ButtonLoader />}
        </button>
        {state?.error && (
          <div className="flex justify-center mt-2">
            <label className="text-xs font-mono text-red-500">{state?.error}</label>
          </div>
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