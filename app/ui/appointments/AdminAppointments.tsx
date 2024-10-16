
'use client'

export default function AdminAppointment() {




    return (
        <div className="relative bg-white rounded-xl flex justify-center items-center py-10 px-52">
            <table className="table-auto" id="table">
                <thead>
                    <tr className="space-x-10">
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
                <tbody className="border-b ">
                    <tr className="bg-white border-b cursor-pointer hover:bg-gray-100">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Sandro
                        </th>
                        <td className="px-6 py-4 text-center">
                            sandrosuarezaranda@gmail.com
                        </td>
                        <td className="px-6 py-4">
                            Motivo de la consulta
                        </td>
                        <td className="px-6 py-4 " >
                            Fecha de la cita
                        </td>
                        <td className="px-6 py-4 " >
                            Hora
                        </td>
                        <td className="px-6 py-4 " >
                            Estado
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>
    );
}