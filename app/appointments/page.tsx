'use client';

import { AppointmentData, AppointmentRows } from "@/lib/definitions";
import Modal from "@/lib/modal";
import { getPlainSession } from "@/lib/session";
import ButtonLoader from "@/ui/ButtonLoader";
import WarningAppointmentDelete from "@/ui/modal/WarningAppointmentDelete";
import { useEffect, useState } from "react";
import { CiSquareRemove } from "react-icons/ci";

export default function Appointments() {
    const [appointments, setAppointments] = useState<AppointmentRows | null>(null);
    const [isLoadingWhileFetching, setIsLoadingWhileFetching] = useState<boolean>(true);
    const [isLoadingWhileDeleting, setIsLoadingWhileDeleting] = useState<boolean>(false);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                setIsLoadingWhileFetching(true);
                const session = await getPlainSession();
                const email = session?.email;

                if (!email) {
                    console.error("No email found in session.");
                    return;
                }
                const response = await fetch(`/api/getUserAppointments?email=${encodeURIComponent(email as string)}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch appointments from the database");
                }
                const data = await response.json();

                setAppointments({
                    rows: data.rows as AppointmentData[],
                    rowCount: data.rowCount
                });
            } catch (error) {
                console.error("Failed to fetch appointments:", error);
            } finally {
                setIsLoadingWhileFetching(false);
            }
        };
        fetchAppointments();
    }, []);

    const suspendAppointment = async (id: string) => {
        setSelectedAppointmentId(id);
        new Modal().showModal();
    }

    const handleSuspendConfirm = async () => {
        try {
            setIsLoadingWhileDeleting(true);
            const response = await fetch(`/api/deleteAppointment?id=${selectedAppointmentId}`, { method: 'DELETE' })
            if (!response.ok) {
                throw new Error("Failed to delete the appointment from the database");
            }

            setAppointments((prevAppointments) => ({
                ...prevAppointments!,
                rows: prevAppointments!.rows.filter((appointment) => appointment.id !== selectedAppointmentId),
                rowCount: prevAppointments!.rowCount - 1,
            }));
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoadingWhileDeleting(false);
        }
    }

    if (isLoadingWhileFetching) {
        return (
            <div className="relative bg-white rounded-xl p-10">
                <ButtonLoader />
            </div>
        );
    }

    return (
        <div className="relative bg-white rounded-xl flex justify-center items-center py-10 px-52">
            <table className="table-auto" id="table">
                <thead>
                    <tr className="space-x-10">
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
                            Suspender cita
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white border-b">
                    {isLoadingWhileDeleting ? (
                        <tr>
                            <td colSpan={4} className="text-center py-4">
                                <ButtonLoader />
                            </td>
                        </tr>
                    ) : appointments && appointments.rowCount !== 0 ? (
                        appointments!.rows.map((appointment, index) => (
                            <tr key={index} className="bg-white border-b cursor-pointer hover:bg-gray-100">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {appointment.appointment_reason}
                                </th>
                                <td className="px-6 py-4 text-center">
                                    {new Date(appointment.date!).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    {appointment.hour}
                                </td>
                                <td className="px-6 py-4 flex justify-center items-center" onClick={() => suspendAppointment(appointment.id!)}>
                                    <CiSquareRemove size={30} color="red" />
                                </td>
                            </tr>
                        ))
                    ) : <tr className="bg-white border-b cursor-pointer hover:bg-gray-100"><td colSpan={5} className="text-center">No tienes ninguna cita pendiente</td></tr>}
                </tbody>
            </table>
            <WarningAppointmentDelete handleSuspendConfirm={handleSuspendConfirm} />
        </div>
    );
}
