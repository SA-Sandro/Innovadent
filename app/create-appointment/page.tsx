'use client'

import { createAppoitment } from "@/lib/actions";
import { initialState } from "@/lib/definitions";
import { ChangeEvent, useState } from "react"
import { useFormState } from "react-dom";

export default function Appointment() {


  const [selectValue, setSelectValue] = useState<string>();
  const [state, action] = useFormState(createAppoitment, initialState);

  return (
    <div className="relative flex justify-center items-center">
      <div className="bg-white p-5 rounded-xl">
        <h1 className="text-xl text-center">Reservar cita</h1>
        <form action={action}>
          <div>
            <label>Motivo de consulta <span className="text-red-500">*</span></label>
            <select name="motive" id="" onChange={(event: ChangeEvent<HTMLSelectElement>) => setSelectValue(event.target.value)}>
              <option defaultChecked value=""></option>
              <option value="Revisión dental">Revisión dental</option>
              <option value="Empaste">Empaste</option>
              <option value="Limpieza bucodental">Limpieza bucodental</option>
              <option value="Dolor bucodental">Dolor bucodental</option>
              <option value="Tratamiento de encías">Tratamiento de encías</option>
              <option value="Ortodoncia">Ortodoncia</option>
              <option value="Otros">Otros</option>
            </select>
          </div>
          {selectValue && selectValue === 'Otros' && (
            <div>
              <textarea maxLength={1000} placeholder="Detalla el motivo de su consulta..." />
            </div>
          )}

          <div>
            <label className="text-gray-800 text-sm mb-2 block">
              Fecha <span className="text-red-500">*</span>
            </label>
            <input
              name="fecha"
              type="date"
              className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
            />
            <label>Hora <span className="text-red-500">*</span></label>
            <select id="hora" name="hora">
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
          </div>

          <button type="submit" className="bg-green-300 border border-black p-1 cursor-pointer">
            Crear cita
          </button>
        </form>
      </div>
    </div>
  )
}

