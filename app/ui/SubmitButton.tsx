"use client";

import { useFormStatus } from "react-dom";
import ButtonLoader from "./ButtonLoader";

export default function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <div className="flex justify-center items-center">
            <button type="submit" className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                {pending ? <ButtonLoader /> : 'Crear cita'}
            </button>
        </div>
    );
}