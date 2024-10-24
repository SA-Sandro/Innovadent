'use client'
import Image from "next/image";
import Link from "next/link";

export default function AccessDenied() {

    return (
        <div className="relative bg-white/90 mx-3 md:mx-5 p-5 md:p-10 rounded-xl flex flex-col justify-center items-center max-w-xl">
            <div className="space-y-2">
                <h1 className="text-5xl text-center">Oops!</h1>
                <h3 className="text-center text-pretty mt-2">No tienes los permisos necesarios para accedes a esta página</h3>
                <p className="text-pretty text-center">Si crees que se trata de un error, intenta ponerte en contacto con algún administrador</p>
            </div>
            <Link href={'/'} type="button" className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Volver
            </Link>
            <Image className="absolute -top-5 right-1 xs:right-10 w-18 h-18 md:w-24 md:h-24" src={'/images/Access_denied.png'} alt="access denied logo" width={100} height={100} />
        </div>
    );
}