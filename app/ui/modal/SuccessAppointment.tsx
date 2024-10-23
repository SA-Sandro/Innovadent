"use client";

import { IoMdClose } from "react-icons/io";
import { GrStatusGood } from "react-icons/gr";
import Link from "next/link";
import Modal from "@/lib/modal";

interface SuccessAppointmentProperties {
    clearForm: () => void;
}

export default function SuccessAppointment({ clearForm }: SuccessAppointmentProperties) {

    const modal = new Modal();

    return (
        <div
            id="default-modal"
            tabIndex={-1}
            aria-hidden="true"
            className="flex backdrop-brightness-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full"
        >
            <div className="relative w-[30%]">
                <div className="relative bg-white rounded-lg shadow py-2 px-5">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <div className="flex items-center">
                            <h3 className="text-lg font-bold text-green-500 flex items-center">
                                La cita ha sido reservada correctamente
                            </h3>
                        </div>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => modal.closeModal()}
                        >
                            <IoMdClose size={20} className="stroke-black hover:stroke-white" />
                        </button>
                    </div>
                    <div className="flex items-center justify-between p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 ">
                        <div className="space-x-2">
                            <button
                                onClick={() => {
                                    clearForm()
                                    modal.closeModal()
                                }}
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Reservar otra cita
                            </button>
                            <Link
                                href={'/appointments'}
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Ver tus citas
                            </Link>
                        </div>
                        <GrStatusGood size={50} color="#22c55e" />
                    </div>
                </div>
            </div>
        </div>
    );
}
