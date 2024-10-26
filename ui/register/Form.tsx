"use client";

import { CustomerData, ErrorState, FileName, User } from "@/lib/definitions";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { fileUpload } from "@/lib/utils";
import Modal from "@/lib/modal";
import UsernameField from "./UsernameField";
import { useSession } from "@/context/SessionContext";
import { saveSession } from "@/lib/session";
import { DEFAULT_IMAGE_URL } from "@/lib/constants";
import MailField from "./MailField";
import PasswordField, { ConfirmPasswordField } from "./PasswordField";
import PhotoPreviewer from "./PhotoField";
import FailedRegistration from "../modal/FailedRegistration";
import ButtonLoader from "../ButtonLoader";

export default function Form() {
  const { setSession } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorState>({
    userErrors: [],
    passwordErrors: [],
    confirmPasswordErrors: [],
    emailErrors: [],
    imageErrors: [],
  });
  const [firstInputPassword, setFirstInputPassword] = useState("");
  let userData: CustomerData;
  let image_url: string | null;

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
      new Modal().showModal();
      return;
    }
    const formData = new FormData(event.currentTarget);

    try {
      if ([formData.get('username'), formData.get('email'), formData.get('password')].some((prop) => prop === "")) {
        new Modal().showModal();
        return;
      }
      setIsLoading(true);

      const file = formData.get('image_url') as File;

      if (file && file.size > 0) {
        const response: FileName = await fileUpload(formData);
        image_url = response.fileName;
      } else {
        image_url = DEFAULT_IMAGE_URL;
      }

      userData = {
        username: formData.get("username") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        image_url: image_url,
      };

      saveSession(userData as User);
    } catch (error) {
      console.error("Error en la conexión:", error);
    }

    try {
      await fetch("/api/postUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
    } catch (error) {
      console.error("Error en la conexión:", error);
    } finally {
      setSession({
        userName: userData.username,
        email: userData.email,
        role: 'user',
        image_url: image_url!,
        isLoggedIn: true,
      })
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
          <PasswordField errors={errors} setErrors={setErrors} setFirstInputPassword={setFirstInputPassword} />
          <ConfirmPasswordField errors={errors} setErrors={setErrors} firstInputPassword={firstInputPassword} />
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Añade una foto de perfil</label>
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
          <a href="/login" className="text-blue-600 font-semibold hover:underline ml-1">
            Inicia sesión aquí
          </a>
        </p>
      </form>
      <FailedRegistration />
    </div>
  );
}
