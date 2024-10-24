import { useEffect, useState } from "react";
import { ErrorState, FormFieldProps } from "@/lib/definitions";
import { checkConfirmPassword, checkPassword } from "@/lib/registerValidations";
import { ChangeEvent, ReactElement } from "react";
import { useDebouncedCallback } from "use-debounce";
import EyeIcon from "../EyeIcon";

export default function PasswordField({
  errors,
  setErrors,
  setFirstInputPassword,
}: FormFieldProps & {
  setFirstInputPassword: (password: string) => void;
}): ReactElement {
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const passErrors = checkPassword(event.target.value);
      if (passErrors !== null) {
        setErrors((prevErrors: ErrorState) => ({
          ...prevErrors,
          passwordErrors: passErrors,
        }));
      } else {
        setErrors((prevErrors: ErrorState) => ({
          ...prevErrors,
          passwordErrors: [],
        }));
      }
      setFirstInputPassword(event.target.value);
    },
    400
  );

  return (
    <div>
      <label className="text-gray-800 text-sm mb-2 block">
        Contraseña <span className="text-red-500">*</span>
      </label>
      <div className="relative flex items-center">
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
          placeholder="Escribe tu contraseña aquí"
          onChange={validatePassword}
        />
        <EyeIcon
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      </div>
      {errors.passwordErrors.length > 0 && (
        <div className="max-w-96">
          {errors.passwordErrors.map((error, index) => (
            <label key={index} className="text-xs font-mono text-red-500">
              {error}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export function ConfirmPasswordField({
  errors,
  setErrors,
  firstInputPassword,
}: FormFieldProps & {
  firstInputPassword: string;
}): ReactElement {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateConfirmPassword = useDebouncedCallback((value: string) => {
    const passErrors = checkConfirmPassword(firstInputPassword, value);
    if (passErrors !== null) {
      setErrors((prevErrors: ErrorState) => ({
        ...prevErrors,
        confirmPasswordErrors: passErrors,
      }));
    } else {
      setErrors((prevErrors: ErrorState) => ({
        ...prevErrors,
        confirmPasswordErrors: [],
      }));
    }
  }, 400);

  useEffect(() => {
    validateConfirmPassword(confirmPassword);
  }, [firstInputPassword, confirmPassword, validateConfirmPassword]);

  const handleConfirmPasswordChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setConfirmPassword(value);
    validateConfirmPassword(value);
  };

  return (
    <div>
      <label className="text-gray-800 text-sm mb-2 block">
        Confirmar contraseña <span className="text-red-500">*</span>
      </label>
      <div className="relative flex items-center">
        <input
          name="confirmPassword"
          type={showPassword ? "text" : "password"}
          className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
          placeholder="Escribe tu contraseña aquí"
          onChange={handleConfirmPasswordChange}
        />
        <EyeIcon
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      </div>
      {errors.confirmPasswordErrors.length > 0 && (
        <div>
          {errors.confirmPasswordErrors.map((error, index) => (
            <label key={index} className="text-xs font-mono text-red-500">
              {error}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
