"use client";

import { IoMdClose } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

export default function AdminEditingAppointment() {

    return (
        <div
            id="default-modal"
            tabIndex={-1}
            aria-hidden="true"
            className="hidden backdrop-brightness-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full"
        >
            <div className="relative  p-4 w-full max-w-md">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <div className="flex items-center">
                            <h3 className="text-lg font-bold text-green-500 flex items-center">
                                Edita la cita
                            </h3>
                        </div>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <IoMdClose size={20} className="stroke-black hover:stroke-white" />
                        </button>
                    </div>
                    <div className="space-y-2 p-4 [&_svg]:open:-rotate-180">
                        <details className="border-2 p-4 [&_svg]:open:-rotate-180">
                            <summary className="flex cursor-pointer list-none items-center gap-4">
                                <div>
                                    <IoIosArrowDown className="rotate-0 transform text-blue-700 transition-all duration-300" />
                                </div>
                                <div>
                                    Fecha
                                </div>
                            </summary>
                            <input className="mt-3 cursor-pointer text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" type="date" value={'15:00'} />
                        </details>

                        <details className="border-2 p-4 [&_svg]:open:-rotate-180">
                            <summary className="flex cursor-pointer list-none items-center gap-4">
                                <div>
                                    <IoIosArrowDown className="rotate-0 transform text-blue-700 transition-all duration-300" />
                                </div>
                                <div>
                                    Hora
                                </div>
                            </summary>
                            <input className="mt-3 cursor-pointer text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" type="text" value={'15:00'} />
                        </details>

                        <details className="border-2 p-4 [&_svg]:open:-rotate-180">
                            <summary className="flex cursor-pointer list-none items-center gap-4">
                                <div>
                                    <IoIosArrowDown className="rotate-0 transform text-blue-700 transition-all duration-300" />
                                </div>
                                <div>
                                    Estado de la cita
                                </div>
                            </summary>
                            <select className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 mt-3 py-3 rounded-md outline-blue-500 cursor-pointer">
                                <option value="Pendiente" defaultChecked>Pendiente</option>
                                <option value="Realizado">Realizado</option>
                                <option value="Suspendido">Suspendido</option>
                            </select>
                        </details>
                    </div>
                    <div className="flex items-center p-4 md:p-5 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                        >
                            Volver
                        </button>
                        <button
                            type="button"
                            className="text-white bg-green-400 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Editar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
