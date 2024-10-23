"use client";

import { CiHome } from "react-icons/ci";
import { MdOutlineManageAccounts } from "react-icons/md";
import { BsClockHistory } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/ui/LogoutButton";
import { useSession } from "@/context/SessionContext";

export default function AdminRoutes() {

    const pathName = usePathname();
    const { session } = useSession();

    return (
        <div className="px-3 py-4 h-full">
            <div className="flex flex-col items-center mt-5 cursor-pointer">
                <Link href="/">
                    <Image
                        width={80}
                        height={60}
                        priority={true}
                        src={`/uploads/${session?.image_url}`}
                        alt="Logo de Innovadent"
                        className="w-auto h-auto rounded-full"
                    />
                </Link>
                <h3 className="text-white font-bold text-lg mt-2">¡Bienvenido, {session?.userName}!</h3>
            </div>
            <div className="flex flex-col text-white h-[70%] justify-between">
                <div className="mt-10 flex flex-col space-y-3 text-md text-left ">
                    <Link
                        href="/"
                        className={`flex items-center hover:bg-gray-900 rounded-md p-1 ${pathName === "/" ? "bg-blue-950" : ""
                            }`}
                    >
                        <CiHome size={25} strokeWidth={0.9} />
                        <span className="ml-1 mt-0.5">Inicio</span>
                    </Link>
                    <Link
                        href="/appointments"
                        className={`flex items-center hover:bg-gray-900 rounded-md p-1 ${pathName === "/appointments" ? "bg-blue-950" : ""
                            }`}
                    >
                        <MdOutlineManageAccounts size={25} />
                        <span className="ml-1">Gestor de citas</span>
                    </Link>
                    <Link
                        href="/history"
                        className={`flex items-center hover:bg-gray-900 rounded-md p-1 ${pathName === "/history" ? "bg-blue-950" : ""
                            }`}
                    >
                        <BsClockHistory size={20} />
                        <span className="ml-1.5">Historial</span>
                    </Link>
                </div>

                <div className="space-y-2">
                    <LogoutButton />
                </div>

            </div>
        </div>
    );
}
