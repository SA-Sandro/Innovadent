'use client';

import { useSession } from "@/context/SessionContext";
import UserAppointments from "../../ui/appointments/UserAppointments";
import AdminAppointment from "../../ui/appointments/AdminAppointments";

export default function Appointments() {

    const session = useSession();

    if (session && session.session?.role === 'user') return <UserAppointments />
    return <AdminAppointment />
}
