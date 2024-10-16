"use client";

import { IoMdClose } from "react-icons/io";
import { CiWarning } from "react-icons/ci";
import Modal from "@/lib/modal";

interface WarningAppointmentDeleteProps {
    handleSuspendConfirm: () => Promise<void>
}

export default function WarningAppointmentDelete({ handleSuspendConfirm }: WarningAppointmentDeleteProps) {

    const modal = new Modal();

    return (
        <div
            id="default-modal"
            tabIndex={-1}
            aria-hidden="true"
            className="hidden backdrop-brightness-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full"
        >
            <div className="relative  p-4 w-full max-w-md">
                <div className="relative bg-white rounded-lg shadow max-w-4xl">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <div className="flex items-center">
                            <h3 className="text-lg font-bold text-orange-300 flex items-center">
                                ¿Estás seguro que quieres suspender la cita seleccionada?
                            </h3>
                            <CiWarning size={35} color="#fdba74" />
                        </div>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => modal.closeModal()}
                        >
                            <IoMdClose size={20} className="stroke-black hover:stroke-white" />
                        </button>
                    </div>
                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 space-x-2">
                        <button
                            onClick={() => {
                                handleSuspendConfirm()
                                modal.closeModal()
                            }}
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Suspender cita
                        </button>
                        <button
                            onClick={() => {
                                modal.closeModal()
                            }}
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
