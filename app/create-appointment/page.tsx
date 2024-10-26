'use client'

import { createAppointment } from "@/lib/actions";
import { AVAILABLE_HOURS } from "@/lib/constants";
import { getBookedHourByDate } from "@/lib/data";
import { appointmentInitialState } from "@/lib/definitions";
import Modal from "@/lib/modal";
import { ChangeEvent, useEffect, useState } from "react"
import { useFormState } from "react-dom";
import SuccessAppointment from "../../ui/modal/SuccessAppointment";
import SubmitButton from "../../ui/SubmitButton";

export default function Appointment() {
  const [selectValue, setSelectValue] = useState<string>();
  const [state, action] = useFormState(createAppointment, appointmentInitialState);
  const [bookedHours, setBookedHours] = useState<Array<string>>([]);

  const showBookedHours = async (event: ChangeEvent<HTMLInputElement>) => {
    const formattedDate = new Date(event.target.value);
    const result = await getBookedHourByDate(new Date(formattedDate));
    setBookedHours(result || []);
  };

  const clearForm = () => {
    const motiveSelect = document.getElementById('motive') as HTMLSelectElement;
    motiveSelect.selectedIndex = 0;

    if (selectValue === 'Otros') {
      const otherMotive = document.getElementById('other') as HTMLInputElement;
      if (otherMotive) {
        otherMotive.value = '';
      }
      setSelectValue('');
    }

    const date = document.getElementById('date') as HTMLInputElement;
    date.value = '';

    const hour = document.getElementById('hour') as HTMLSelectElement;
    hour.selectedIndex = 0;
  }

  useEffect(() => {
    if (state.isSuccess) {
      new Modal().showModal();
    }
  }, [state.appointmentDate, state.isSuccess])

  return (
    <div className="relative flex justify-center items-center w-full">
      <div className="bg-gray-50 rounded-xl w-full mx-5 px-2 py-5 sm:p-10 sm:w-[70%] lg:w-[50%] xl:w-[40%]">
        <h1 className="text-[#1F2937] bg-[#1F2937]/10 rounded-lg text-center text-3xl font-bold py-5 mb-5">¡Reserva una cita!</h1>
        <form action={action} className="space-y-5">
          <div>
            <label className="text-gray-800 text-sm mb-2 block">
              Elije el motivo de consulta <span className="text-red-500"> *</span>
            </label>
            <select id="motive" name="motive"
              className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500 cursor-pointer"
              onChange={(event: ChangeEvent<HTMLSelectElement>) => setSelectValue(event.target.value)}>
              <option value="">Seleccione una opción</option>
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
                <textarea id="other" name="other" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Escribe el motivo de la cita..." />
              </div>
            )}

            {state.error.reason && (
              <div>
                {state.error.reason.map((error, index) => (
                  <label key={index} className="text-xs font-mono text-red-500">{error}</label>
                ))}
              </div>
            )}
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">
              Fecha <span className="text-red-500">*</span>
            </label>
            <input
              onChange={showBookedHours}
              name="date"
              id="date"
              type="date"
              className="cursor-pointer text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
            />
            {state.error.date && (
              <div>
                {state.error.date.map((error, index) => (
                  <label key={index} className="text-xs font-mono text-red-500">{error}</label>
                ))}
              </div>
            )}
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">
              Hora <span className="text-red-500">*</span>
            </label>
            <select id="hour" name="hour" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500 cursor-pointer">
              {AVAILABLE_HOURS.map((hour) => (
                <option key={hour} value={hour} className={bookedHours.includes(hour) ? 'bg-red-500 text-white flex' : ''}>
                  {hour.slice(0, 5)}
                </option>
              ))}
            </select>
            {state.error.hour && (
              <div>
                {state.error.hour.map((error, index) => (
                  <label key={index} className="text-xs font-mono text-red-500">{error}</label>
                ))}
              </div>
            )}
          </div>
          <SubmitButton />
        </form>
      </div>
      <SuccessAppointment clearForm={clearForm} />
    </div>
  );
}