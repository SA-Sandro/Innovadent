"use client";

import { CustomerData, ErrorState } from "@/lib/definitions";
import MailField from "@/ui/register/MailField";
import PasswordField, {
  ConfirmPasswordField,
} from "@/ui/register/PasswordField";
import PhotoPreviewer from "@/ui/register/PhotoField";
import UsernameField from "@/ui/register/UsernameField";
import { FormEvent, useState } from "react";
import ButtonLoader from "../ButtonLoader";
import { useRouter } from "next/navigation";
import Modal, { showModal } from "../modal/Modal";

export default function Form() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorState>({
    userErrors: [],
    passwordErrors: [],
    confirmPasswordErrors: [],
    emailErrors: [],
    imageErrors: [],
  });
  const [firstInputPassword, setFirstInputPassword] = useState("");

  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      [
        errors.userErrors,
        errors.emailErrors,
        errors.passwordErrors,
        errors.confirmPasswordErrors,
        errors.imageErrors,
      ].some((field) => field.length > 0)
    ) {
      showModal();
      return;
    }
    const formData = new FormData(event.currentTarget);
    const image_url = formData.get("image_url") as File;

    const data: CustomerData = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      image_url: image_url.name,
    };

    if (
      [data.username, data.email, data.password, data.image_url].some(
        (prop) => prop === ""
      )
    ) {
      showModal();
      return;
    }
    try {
      setIsLoading(true);
      await fetch("/api/postUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Error en la conexión:", error);
    } finally {
      setIsLoading(false);
      router.push("/");
    }
  }

  return (
    <div className="relative">
      <form onSubmit={onSubmit}>
        <div className="space-y-6">
          <UsernameField errors={errors} setErrors={setErrors} />
          <MailField errors={errors} setErrors={setErrors} />
          <PasswordField
            errors={errors}
            setErrors={setErrors}
            setFirstInputPassword={setFirstInputPassword}
          />
          <ConfirmPasswordField
            errors={errors}
            setErrors={setErrors}
            firstInputPassword={firstInputPassword}
          />
          <div>
            <label className="text-gray-800 text-sm mb-2 block">
              Añade una foto de perfil
            </label>
            <PhotoPreviewer errors={errors} setErrors={setErrors} />
          </div>
        </div>

        <div className="!mt-12">
          <button
            type="submit"
            className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            {!isLoading ? "Crear cuenta" : <ButtonLoader />}
          </button>
        </div>
        <p className="text-gray-800 text-sm mt-6 text-center">
          ¿Ya tienes una cuenta?{" "}
          <a
            href="/login"
            className="text-blue-600 font-semibold hover:underline ml-1"
          >
            Inicia sesión aquí
          </a>
        </p>
      </form>
      <Modal />
    </div>
  );
}
