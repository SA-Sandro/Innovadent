'use client'

import { AppointmentData, AppointmentRows } from "@/lib/definitions";
import ButtonLoader from "@/ui/ButtonLoader";
import Image from "next/image";
import { useEffect, useState } from "react"

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
            <ButtonLoader />
        </div>
    )

    return (

        <div className="relative bg-white rounded-xl flex justify-center items-center py-10 px-52">
            <table className="table-auto overflow-y-scroll" id="table">
                <thead>
                    <tr className="space-x-10">
                        <th scope="col" className="px-6 py-3">

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
                    {allNonPendingAppointments?.rowCount! < 1 ? (
                        <td className="text-center px-6 py-4" scope="row" colSpan={7}>El historial se encuentra vacío</td>
                    ) : allNonPendingAppointments?.rows.map((appointment, index) => (
                        <tr key={index} className="border-b cursor-pointer relative">
                            <td className="px-6 py-4">
                                <Image className="rounded-full h-auto w-auto" src={`/uploads/${appointment.image_url}`} height={50} width={50} alt={`Foto de perfil de ${appointment.username}`} />
                            </td>
                            <td scope="row" className="px-6 py-4">{appointment.username}</td>
                            <td scope="row" className="px-6 py-4">{appointment.user_email}</td>
                            <td scope="row" className="px-6 py-4">{appointment.appointment_reason}</td>
                            <td scope="row" className="px-6 py-4">{new Date(appointment.date!).toLocaleDateString()}</td>
                            <td scope="row" className="px-6 py-4">{appointment.hour}</td>
                            <td scope="row" className="px-6 py-4">{appointment.state}</td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}