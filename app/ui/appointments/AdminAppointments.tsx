
'use client'

export default function AdminAppointment() {

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

            </table>
        </div>
    );
}