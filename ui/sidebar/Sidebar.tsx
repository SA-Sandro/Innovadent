"use client";

import { useState } from "react";
import { RiMenu2Line } from "react-icons/ri";
import Aside from "./Aside";

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
