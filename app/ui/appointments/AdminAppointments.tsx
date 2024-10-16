
'use client'

import { AppointmentData, AppointmentRows } from "@/lib/definitions";
import Image from "next/image";
import { useEffect, useState } from "react";
import ButtonLoader from "../ButtonLoader";

export default function AdminAppointment() {

    const [allUsersAppointment, setAllUsersAppointment] = useState<AppointmentRows | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
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
        fetchAllUsersAppointment();
    }, [])


    if (isLoading) {
        return (
            <div className="relative bg-white rounded-xl flex justify-center items-center py-10 px-52">
                <ButtonLoader />
            </div>
        )
    }

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
                    </tr>
                </thead>
                <tbody className="border-b ">
                    {allUsersAppointment && allUsersAppointment?.rowCount < 1 ? (
                        <tr className="bg-white border-b cursor-pointer hover:bg-gray-100">
                            <td rowSpan={5} className="text-center px-6 py-4">
                                No hay ninguna cita pendiente
                            </td>
                        </tr>
                    ) : allUsersAppointment?.rows.map((user, index) => (
                        <tr key={index} className="bg-white border-b cursor-pointer hover:bg-gray-100">
                            <td scope="row" className="px-6 py-4">
                                <Image className="rounded-full h-auto w-auto" src={`/uploads/${user.image_url}`} height={50} width={50} alt={`Foto de perfil de ${user.username}`} />
                            </td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {user.username}
                            </td>
                            <td className="px-6 py-4 text-center">
                                {user.user_email}
                            </td>
                            <td className="px-6 py-4">
                                {user.appointment_reason}
                            </td>
                            <td className="px-6 py-4 " >
                                {new Date(user.date!).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 " >
                                {user.hour}
                            </td>
                        </tr>
                    )

                    )}

                </tbody>
            </table>
        </div>
    );
}