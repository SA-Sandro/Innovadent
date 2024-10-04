"use client";

import { CiHome } from "react-icons/ci";
import { MdOutlineManageAccounts } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/ui/LogoutButton";

export default function AdminRoutes() {

    const pathName = usePathname();
    return (
        <div className="px-3 py-4 bg-[#1F2937] h-full">
            <div className="flex flex-col items-center mt-5 cursor-pointer">
                <Link href="/">
                    <Image
                        width={60}
                        height={60}
                        priority={true}
                        src="/images/logo_empresa.png"
                        alt="Logo de Innovadent"
                        className="w-auto h-auto"
                    />
                </Link>
                <h3 className="text-white font-bold text-2xl">Innovadent</h3>
            </div>
            <div className="flex flex-col text-white h-[70%] justify-between">
                <div className="mt-10 flex flex-col space-y-3 text-md text-left ">
                    <Link
                        href="/"
                        className={`flex items-center hover:bg-gray-700 rounded-md p-1 ${pathName === "/" ? "bg-blue-950" : ""
                            }`}
                    >
                        <CiHome size={20} strokeWidth={0.9} />
                        <span className="ml-1">Inicio</span>
                    </Link>
                    <Link
                        href="/create-appointment"
                        className={`flex items-center hover:bg-gray-700 rounded-md p-1 ${pathName === "/create-appointment" ? "bg-blue-950" : ""
                            }`}
                    >
                        <MdOutlineManageAccounts size={20} />
                        <span className="ml-1">Gestor de citas</span>
                    </Link>
                </div>

                <div className="space-y-2">
                    <LogoutButton />
                </div>

            </div>
        </div>
    );
}
