"use client";

import Modal from "@/lib/modal";
import { IoMdClose } from "react-icons/io";
import { MdOutlineErrorOutline } from "react-icons/md";

export default function FailedRegistration() {

  const modal = new Modal();

  return (
    <div
      id="default-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="hidden backdrop-brightness-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full"
    >
      <div className="relative  p-4 w-full max-w-xl max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-bold text-red-500 flex items-center space-x-1 ">
              <span>Algo no fue bien</span>
              <MdOutlineErrorOutline size={20} color="#ef4444" />
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => modal.closeModal()}
            >
              <IoMdClose size={20} className="stroke-black hover:stroke-white" />
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <p className="text-base leading-relaxed text-black">
              La información que has proporcionado no es válida. Por favor,
              asegurate de que:
            </p>
            <ul className="mx-5 text-base leading-relaxed [&_li]:text-black list-disc ">
              <li>Todos los campos marcados con `*` hayan sido rellenados</li>
              <li>La información cumpla con las reglas del registro</li>
            </ul>
          </div>
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              onClick={() => modal.closeModal()}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
