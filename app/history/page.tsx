'use client'

import { AppointmentData, AppointmentRows } from "@/lib/definitions";
import Image from "next/image";
import { useEffect, useState } from "react"
import TableLoader from "../../ui/skeletons/TableSkeleton";

export default function History() {

    const [allNonPendingAppointments, setAllNonPendingAppointments] = useState<AppointmentRows>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchNotPendingAppointments = async () => {
        try {
            const response = await fetch('/api/getAllNotPendingAppointments');
            if (!response.ok) {
                throw new Error('Error trying to fetch the users appointment');
            }
            const data = await response.json();
            console.log(data.rowCount);
            setAllNonPendingAppointments({
                rowCount: data.rowCount,
                rows: data.rows as AppointmentData[]
            })
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchNotPendingAppointments();
    }, [])


    if (isLoading) return (
        <div className="relative bg-white rounded-xl flex justify-center items-center py-10 px-52">
            <TableLoader />
        </div>
    )

    return (
        <div className="relative w-full flex justify-center mx-10 my-10">
            <div className="bg-gray-50 rounded-xl items-center w-full max-w-7xl">
                <h1 className="text-[#1F2937] bg-[#1F2937]/10 rounded-lg text-center text-2xl sm:text-3xl font-bold py-5 mx-auto my-5 px-10 max-w-96">
                    Historial de citas
                </h1>
                <div className="overflow-x-auto max-w-6xl mx-auto my-10">
                    <table id="table" className="my-5">
                        <thead>
                            <tr className="bg-gray-100">
                                <th scope="col" className="px-6 py-3 text-gray-100">
                                    Imagen
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Usuario
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Correo
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Motivo de la consulta
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Fecha de la cita
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Hora
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Estado
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {allNonPendingAppointments!.rowCount < 1 ? (
                                <tr className="bg-white relative cursor-pointer hover:border-[#1F2973] hover:border text-center">
                                    <td className="text-center px-6 py-4" scope="row" colSpan={7}>El historial se encuentra vacío</td>
                                </tr>
                            ) : allNonPendingAppointments?.rows.map((appointment, index) => (
                                <tr key={index} className="relative cursor-pointer hover:border-[#1F2973] hover:border odd:bg-white even:bg-[#1F2937]/10 text-center">
                                    <td className="px-6 py-4 text-center">
                                        <Image className="rounded-full h-14 w-14" src={`/uploads/${appointment.image_url}`} height={100} width={100} alt={`Foto de perfil de ${appointment.username}`} />
                                    </td>
                                    <td scope="row" className="px-5">{appointment.username}</td>
                                    <td scope="row" className="px-5">{appointment.user_email}</td>
                                    <td scope="row" className="px-5">{appointment.appointment_reason}</td>
                                    <td scope="row" className="px-5">{new Date(appointment.date!).toLocaleDateString()}</td>
                                    <td scope="row" className="px-5">{appointment.hour}</td>
                                    <td scope="row" className="px-5">{appointment.state}</td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}