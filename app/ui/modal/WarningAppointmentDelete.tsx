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
            <div className="relative w-full sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[40%]">
                <div className="relative bg-white rounded-lg shadow py-2 px-5">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                        <div className="flex items-center">
                            <h3 className="text-lg font-bold flex items-center">
                                ¿Estás seguro que quieres suspender la cita seleccionada?
                            </h3>
                        </div>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                            onClick={() => modal.closeModal()}
                        >
                            <IoMdClose size={20} className="stroke-black hover:stroke-white" />
                        </button>
                    </div>
                    <div className="flex items-center justify-between p-4 md:p-5 border-t border-gray-200 rounded-b">
                        <div className="flex flex-col space-y-2 xs:flex-row xs:space-x-2 xs:space-y-0">
                            <button
                                onClick={() => {
                                    handleSuspendConfirm()
                                    modal.closeModal()
                                }}
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Suspender cita
                            </button>
                            <button
                                onClick={() => {
                                    modal.closeModal()
                                }}
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Volver
                            </button>
                        </div>
                        <CiWarning className="size-10 text-orange-500" />
                    </div>

                </div>
            </div>
        </div>
    );
}
