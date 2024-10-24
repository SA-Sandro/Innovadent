
'use client'

import { AppointmentData, AppointmentRows } from "@/lib/definitions";
import Image from "next/image";
import { useEffect, useState } from "react";
import ButtonLoader from "@/ui/ButtonLoader";
import { BiSolidEdit } from "react-icons/bi";
import EditingAppointmentPane from "@/ui/appointments/EditingAppointmentPane";


export default function AdminAppointment() {
    const [showPane, setShowPane] = useState<boolean>(false);
    const [appointmentToEdit, setAppointmentToEdit] = useState<AppointmentData>();
    const [allUsersAppointment, setAllUsersAppointment] = useState<AppointmentRows | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchAllUsersAppointment = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/getAllUsersAppointment');
            if (!response.ok) {
                throw new Error('Error trying to fetch the users appointment');
            }
            const data = await response.json();
            setAllUsersAppointment({
                rows: data.rows as AppointmentData[],
                rowCount: data.rowCount
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchAllUsersAppointment();
    }, []);

    if (isLoading) {
        return (
            <div className="relative bg-white rounded-xl flex justify-center items-center py-10 px-52">
                <ButtonLoader />
            </div>
        )
    }
    if (showPane) return <EditingAppointmentPane setShowPane={setShowPane} appointmentToEdit={appointmentToEdit!} fetchAllUsersAppointment={fetchAllUsersAppointment} />

    return (
        <div className="relative w-full flex justify-center mx-10">
            <div className="bg-gray-50 rounded-xl items-center w-full max-w-7xl">
                <h1 className="text-[#1F2937] bg-[#1F2937]/10 rounded-lg text-center text-2xl sm:text-3xl font-bold py-5 mx-auto my-5 px-10 max-w-96">
                    Citas pendientes
                </h1>
                <div className="overflow-x-auto max-w-5xl mx-auto my-10">
                    <table id="table">
                        <thead>
                            <tr className="space-x-10">
                                <th scope="col" className="px-6 py-3 text-gray-50">
                                    Imagen
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Usuario
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Correo
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Motivo
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Fecha
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Hora
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Estado
                                </th>
                            </tr>
                        </thead>
                        <tbody className="border-b ">
                            {allUsersAppointment && allUsersAppointment?.rowCount < 1 ? (
                                <tr className="bg-white border-b cursor-pointer hover:bg-gray-100">
                                    <td rowSpan={5} className="text-center px-6 py-4">
                                        No hay ninguna cita pendiente
                                    </td>
                                </tr>
                            ) : allUsersAppointment?.rows.map((userAppointment, index) => (
                                <tr key={index} className="bg-white relative cursor-pointer hover:border-[#1F2973] hover:border text-center">
                                    <td scope="row" className="px-6 py-4">
                                        <Image className="rounded-full h-auto w-auto" src={`/uploads/${userAppointment.image_url}`} height={50} width={50} alt={`Foto de perfil de ${userAppointment.username}`} />
                                    </td>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900">
                                        {userAppointment.username}
                                    </td>
                                    <td className="px-6 py-4">
                                        {userAppointment.user_email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {userAppointment.appointment_reason}
                                    </td>
                                    <td className="px-6 py-4" >
                                        {new Date(userAppointment.date!).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4" >
                                        {userAppointment.hour?.slice(0, 5)}
                                    </td>
                                    <td className="px-6 py-4" >
                                        {userAppointment.state}
                                    </td>
                                    <td>
                                        <div className="absolute opacity-0 hover:opacity-100 backdrop-blur-sm transition-opacity duration-100 flex justify-center items-center top-0 bottom-0 right-0 left-0 bg-gray-300/30 cursor-pointer">
                                            <button type="button" onClick={() => {
                                                setShowPane(true)
                                                setAppointmentToEdit(userAppointment);
                                            }}>
                                                <BiSolidEdit size={40} color="white" className="bg-green-400 p-1.5 rounded-full cursor-pointer hover:scale-125 duration-75" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}