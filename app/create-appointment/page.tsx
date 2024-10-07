'use client'

import { createAppointment } from "@/lib/actions";
import { appointmentInitialState, appointmentStateType } from "@/lib/definitions";
import { ChangeEvent, useState } from "react"
import { useFormState } from "react-dom";

export default function Appointment() {


  const [selectValue, setSelectValue] = useState<string>();
  const [state, action] = useFormState(createAppointment, appointmentInitialState);
  console.log(state.error)
  return (
    <div className="relative flex justify-center items-center bg-white p-20 rounded-xl w-[30%]">
      <div className="px-10 rounded-xl w-full">
        <h1 className="text-2xl font-bold text-center">Reservar cita</h1>
        <form action={action} className="space-y-5">
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Elije el motivo de consulta
              <span className="text-red-500"> *</span>
            </label>
            <select name="motive"
              className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500 cursor-pointer"
              onChange={(event: ChangeEvent<HTMLSelectElement>) => setSelectValue(event.target.value)}>
              <option value="">Seleccine una opción</option>
              <option value="Revisión dental">Revisión dental</option>
              <option value="Empaste">Empaste</option>
              <option value="Limpieza bucodental">Limpieza bucodental</option>
              <option value="Dolor bucodental">Dolor bucodental</option>
              <option value="Tratamiento de encías">Tratamiento de encías</option>
              <option value="Ortodoncia">Ortodoncia</option>
              <option value="Otros">Otros</option>
            </select>
            {selectValue && selectValue === 'Otros' && (
              <div className="mt-5">
                <label htmlFor="other"></label>
                <textarea id="other" name="other" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Escribe el motivo de la cita..." />
              </div>
            )}

            {state.error.reason && <div>
              {state.error.reason.map((error, index) => <label key={index} className="text-xs font-mono text-red-500">{error}</label>)}
            </div>}
          </div>

          <div>
            <label className="text-gray-800 text-sm mb-2 block">
              Fecha <span className="text-red-500">*</span>
            </label>
            <input
              name="date"
              type="date"
              className="cursor-pointer text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
            />
            {state.error.date && <div>
              {state.error.date.map((error, index) => <label key={index} className="text-xs font-mono text-red-500">{error}</label>)}
            </div>}
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Hora
              <span className="text-red-500"> *</span>
            </label>
            <select name="hour" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500 cursor-pointer">
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>
              <option value="13:00">13:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
            </select>
            {state.error.hour && <div>
              {state.error.hour.map((error, index) => <label key={index} className="text-xs font-mono text-red-500">{error}</label>)}
            </div>}
          </div>
          <div className="flex justify-center items-center">
            <button type="submit" className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
              Crear cita
            </button>
          </div>

        </form>
      </div >
    </div >
  )
}

