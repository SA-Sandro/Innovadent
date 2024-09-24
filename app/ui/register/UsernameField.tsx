"use client";

import { ErrorState, FormFieldProps } from "@/lib/definitions";
import { checkUsername } from "@/lib/utils";
import { ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function UsernameField({
  errors,
  setErrors,
}: FormFieldProps) {
  const validateUsername = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const userErrors = checkUsername(event.target.value);

      if (userErrors !== null) {
        setErrors((prevErrors: ErrorState) => ({
          ...prevErrors,
          userErrors: userErrors,
        }));
        return;
      }
      setErrors((prevErrors: ErrorState) => ({
        ...prevErrors,
        userErrors: [],
      }));
    },
    400
  );

  return (
    <div>
      <label className="text-gray-800 text-sm mb-2 block">
        Nombre de usuario <span className="text-red-500">*</span>
      </label>
      <input
        name="username"
        type="text"
        className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
        placeholder="Escribe tú nombre de usuario"
        onChange={validateUsername}
      />

      {errors.userErrors.length > 0 && (
        <div>
          {errors.userErrors.map((error, index) => (
            <label key={index} className="text-xs font-mono text-red-500">
              {error}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
