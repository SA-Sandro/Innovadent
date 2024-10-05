'use client'
import { CiWarning } from "react-icons/ci";

export default function AccessDenied() {

    return (
        <div className="relative bg-white/90 px-3 p-5 sm:p-5 md:p-10 m-5 rounded-xl">
            <h1 className="text-2xl text-center">Acceso Denegado</h1>
            <p className="text-xl">No tienes permiso para acceder a esta página.</p>
            <CiWarning className="absolute top-0 right-0" size={50} color="red" />
        </div>
    );
}