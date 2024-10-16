'use client';

import { useSession } from "@/context/SessionContext";
import AdminAppointment from "@/ui/appointments/AdminAppointments";
import UserAppointments from "@/ui/appointments/UserAppointments";

export default function Appointments() {

    const session = useSession();

    if (session && session.session?.role === 'user') return <UserAppointments />
    return <AdminAppointment />
}
