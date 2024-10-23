
'use client'
import { AppointmentData, AppointmentRows } from "@/lib/definitions";
import Modal from "@/lib/modal";
import { getPlainSession } from "@/lib/session";
import { useEffect, useState } from "react";
import ButtonLoader from "../ButtonLoader";
import { CiSquareRemove } from "react-icons/ci";
import WarningAppointmentDelete from "../modal/WarningAppointmentDelete";


export default function UserAppointments() {
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
            const response = await fetch(`/api/updateAppointment`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: selectedAppointmentId,
                })
            })
            if (!response.ok) {
                throw new Error("Failed to update the appointment state");
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
        <div className="relative w-full flex justify-center mx-10">
            <div className="bg-gray-50 rounded-xl items-center w-full max-w-[1400px]">
                <h1 className="text-[#1F2937] bg-[#1F2937]/10 rounded-lg text-center text-2xl sm:text-3xl font-bold py-5 mx-auto my-5 px-10 max-w-80">
                    Tus citas
                </h1>
                <div className="overflow-x-auto max-w-2xl mx-auto">
                    <table id="table" className="m-5">
                        <thead>
                            <tr className="text-xs sm:text-sm bg-gray-100">
                                <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-center">
                                    Motivo de la consulta
                                </th>
                                <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-center">
                                    Fecha de la cita
                                </th>
                                <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-center">
                                    Hora
                                </th>
                                <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-center">
                                    Suspender cita
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white overflow-x-auto">
                            {isLoadingWhileDeleting ? (
                                <tr>
                                    <td colSpan={4} className="text-center py-4">
                                        <ButtonLoader />
                                    </td>
                                </tr>
                            ) : appointments && appointments.rowCount !== 0 ? (
                                appointments.rows.map((appointment, index) => (
                                    <tr key={index} className="bg-white cursor-pointer hover:border-[#1F2973] hover:border odd:bg-white even:bg-[#1F2937]/10">
                                        <th
                                            className="px-4 py-2 sm:px-6 sm:py-4 font-medium text-gray-900 whitespace-nowrap text-center"
                                        >
                                            {appointment.appointment_reason}
                                        </th>
                                        <td className="px-4 py-2 sm:px-6 sm:py-4 text-center">
                                            {new Date(appointment.date!).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-2 sm:px-6 sm:py-4 text-center">
                                            {appointment.hour}
                                        </td>
                                        <td
                                            className="px-4 py-2 sm:px-6 sm:py-4 flex justify-center items-center text-center"
                                            onClick={() => suspendAppointment(appointment.id!)}
                                        >
                                            <CiSquareRemove
                                                size={24}
                                                color="red"
                                                className="hover:scale-125 duration-75"
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="bg-white border-b">
                                    <td colSpan={4} className="text-center py-4">
                                        No tienes ninguna cita pendiente
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>


            <WarningAppointmentDelete handleSuspendConfirm={handleSuspendConfirm} />
        </div>

    );
}