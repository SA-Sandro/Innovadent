"use client";

import Image from "next/image";
import { ReactElement, useState } from "react";
import { RiMenu2Line } from "react-icons/ri";
import { CiHome } from "react-icons/ci";
import { MdOutlineManageAccounts } from "react-icons/md";
import UserSideBar from "@/ui/UserSideBar/UserSideBar";

type AsideProps = {
  burguerIsClicked: boolean;
};

const Aside = ({ burguerIsClicked }: AsideProps): ReactElement => {
  return (
    <aside
      className={`fixed top-0 z-50 left-0 w-64 h-screen transition-transform sm:translate-x-0
        ${burguerIsClicked ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="px-3 py-4 bg-[#1F2937] h-full">
        <div className="flex flex-col items-center mt-5 cursor-pointer">
          <a href="/create-appointment">
            <Image
              width={60}
              height={60}
              priority={true}
              src="/images/logo_empresa.png"
              alt="Logo de Innovadent"
              className="w-auto h-auto"
            />
          </a>
          <h3 className="text-white font-bold text-2xl">Innovadent</h3>
        </div>
        <div className="flex flex-col text-white h-[80%] justify-between">
          <div className="mt-10 flex flex-col space-y-3 text-md text-left ">
            <a
              href="/"
              className="flex items-center hover:bg-gray-700 rounded-md p-1"
            >
              <CiHome size={20} strokeWidth={0.9} />
              <span className="ml-1">Inicio</span>
            </a>
            <a
              href="/create-appointment"
              className="flex items-center hover:bg-gray-700 rounded-md p-1"
            >
              <MdOutlineManageAccounts size={20} />
              <span className="ml-1">Gestor de citas</span>
            </a>
          </div>
          <div className="flex justify-end items-end">
            <UserSideBar />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default function Sidebar() {
  const [burguerIsClicked, setBurguerIsClicked] = useState(false);

  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const sidebar = document.querySelector("#sidebar") as HTMLElement;
    window.addEventListener("click", (event: MouseEvent) => {
      if (!sidebar?.contains(event.target as Node)) {
        setBurguerIsClicked(false);
      }
    });
  }

  return (
    <div id="sidebar" className="w-20">
      <button
        onClick={() => {
          setBurguerIsClicked(!burguerIsClicked);
        }}
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden"
      >
        <RiMenu2Line size={20} color="black" />
      </button>
      <Aside burguerIsClicked={burguerIsClicked} />
    </div>
  );
}
