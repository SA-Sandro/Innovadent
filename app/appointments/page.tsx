'use client';

import { AppointmentData, AppointmentRows } from "@/lib/definitions";
import { getPlainSession } from "@/lib/session";
import { useEffect, useState } from "react";

export default function Appointments() {
    const [appointments, setAppointments] = useState<AppointmentRows | null>(null); // Initialize state with null
    const [loading, setLoading] = useState<boolean>(true); // Loading state

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
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
                setLoading(false);
            }
        };
        fetchAppointments();
    }, []);

    if (loading) {
        return <div className="relative bg-white rounded-xl p-10">Loading...</div>;
    }

    if (!appointments || appointments.rowCount === 0) {
        return <div className="relative bg-white rounded-xl p-10">No appointments found.</div>;
    }

    return (
        <div className="relative bg-white rounded-xl flex justify-center items-center py-10 px-52">
            <table className="table-auto">
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
                    </tr>
                </thead>
                <tbody className="bg-white border-b">
                    {appointments.rows.map((appointment, index) => (
                        <tr key={index} className="bg-white border-b cursor-pointer hover:bg-gray-100">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {appointment.appointment_reason}
                            </th>
                            <td className="px-6 py-4">
                                {new Date(appointment.date!).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                                {appointment.hour}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
