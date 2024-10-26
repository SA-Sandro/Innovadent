"use client";

import { ErrorState, FormFieldProps } from "@/lib/definitions";
import { checkEmail } from "@/lib/registerValidations";
import { ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function MailField({ errors, setErrors }: FormFieldProps) {
  const validateEmail = useDebouncedCallback(
    async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
      const emailErrors = await checkEmail(event.target.value);

      if (emailErrors !== null) {
        setErrors((prevErrors: ErrorState) => ({
          ...prevErrors,
          emailErrors: emailErrors,
        }));
        return;
      }
      setErrors((prevErrors: ErrorState) => ({
        ...prevErrors,
        emailErrors: [],
      }));
    },
    400
  );

  return (
    <div>
      <label className="text-gray-800 text-sm mb-2 block">
        Correo electrónico <span className="text-red-500">*</span>
      </label>
      <input
        name="email"
        type="text"
        className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
        placeholder="Escribe tú correo aquí"
        onChange={validateEmail}
      />
      {errors.emailErrors.length > 0 && (
        <div>
          {errors.emailErrors.map((error, index) => (
            <label key={index} className="text-xs font-mono text-red-500">
              {error}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
