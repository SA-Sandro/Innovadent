"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";
import { CiHome, CiLogin } from "react-icons/ci";
import { LuUserCircle2 } from "react-icons/lu";
import { MdOutlineManageAccounts } from "react-icons/md";

type AsideProps = {
  burguerIsClicked: boolean;
};

export default function Aside({ burguerIsClicked }: AsideProps): ReactElement {
  const pathName = usePathname();

  return (
    <aside
      className={`fixed top-0 z-50 left-0 w-64 h-screen transition-transform sm:translate-x-0
        ${burguerIsClicked ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="px-3 py-4 bg-[#1F2937] h-full">
        <div className="flex flex-col items-center mt-5 cursor-pointer">
          <Link href="/create-appointment">
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
              className={`flex items-center hover:bg-gray-700 rounded-md p-1 ${
                pathName === "/" ? "bg-blue-950" : ""
              }`}
            >
              <CiHome size={20} strokeWidth={0.9} />
              <span className="ml-1">Inicio</span>
            </Link>
            <Link
              href="/create-appointment"
              className={`flex items-center hover:bg-gray-700 rounded-md p-1 ${
                pathName === "/create-appointment" ? "bg-blue-950" : ""
              }`}
            >
              <MdOutlineManageAccounts size={20} />
              <span className="ml-1">Gestor de citas</span>
            </Link>
          </div>
          <div className="space-y-2">
            <Link
              href="/login"
              className={`flex items-center hover:bg-gray-700 rounded-md p-1 ${
                pathName === "/login" ? "bg-blue-950" : ""
              }`}
            >
              <CiLogin size={20} strokeWidth={1} />
              <span className="ml-2">Iniciar sesión</span>
            </Link>
            <Link
              href="/register"
              className={`flex items-center hover:bg-gray-700 rounded-md p-1 ${
                pathName === "/register" ? "bg-blue-950" : ""
              }`}
            >
              <LuUserCircle2 size={20} />
              <span className="ml-2">Regístrate</span>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
