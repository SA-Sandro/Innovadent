"use client";

import { AVAILABLE_HOURS } from "@/lib/constants";
import { getBookedHourByDate } from "@/lib/data";
import { AppointmentData } from "@/lib/definitions";
import { getParsedAppointmentToUpdate } from "@/lib/schemas";
import { getLocalDate } from "@/lib/utils";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import ButtonLoader from "../ButtonLoader";

interface EditingAppointmentPane {
    setShowPane: Dispatch<SetStateAction<boolean>>;
    appointmentToEdit: AppointmentData;
    fetchAllUsersAppointment: () => void
}

interface UpdateErrors {
    date: string[] | undefined,
    hour: string[] | undefined,
    state: string[] | undefined
}

export default function EditingAppointmentPanel({ setShowPane, appointmentToEdit, fetchAllUsersAppointment }: EditingAppointmentPane) {
    const [date, setDate] = useState(() => {
        return getLocalDate(appointmentToEdit.date!);
    });
    const [hour, setHour] = useState(appointmentToEdit.hour || "15:00");
    const [state, setState] = useState(appointmentToEdit.state || "Pendiente");
    const [bookedHours, setBookedHours] = useState<Array<string>>([]);
    const [errors, setErrors] = useState<UpdateErrors>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const showBookedHours = async (date: Date) => {
        const formattedDate = new Date(date);
        formattedDate.setDate(formattedDate.getDate() + 1)
        const result = await getBookedHourByDate(formattedDate);
        setBookedHours(result || []);
    };

    const getStyledHour = (availableHour: string): string => {
        if (appointmentToEdit.hour === availableHour) {
            return 'bg-orange-500 text-white flex';
        }
        if (bookedHours.includes(availableHour)) {
            return 'bg-red-500 text-white flex';
        }
        return '';
    }

    const initialDateRef = useRef(appointmentToEdit.date!);

    useEffect(() => {
        showBookedHours(initialDateRef.current);
    }, []);

    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const formattedDate = new Date(event.target.value);
        formattedDate.setDate(formattedDate.getDate() - 1);
        showBookedHours(formattedDate)
        setDate(event.target.value);
    };

    const handleTimeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setHour(event.target.value);
    };

    const handleStateChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setState(event.target.value);
    };

    const updateAppointment = async () => {

        if (appointmentToEdit.hour === hour &&
            new Date(appointmentToEdit.date!).toDateString() === new Date(date).toDateString() &&
            appointmentToEdit.state === state) {
            setShowPane(false);
            return;
        }

        setIsLoading(true);
        const data = {
            date: new Date(date),
            hour: hour,
            state: state
        }
        const parsedData = await getParsedAppointmentToUpdate(data, appointmentToEdit.hour);
        if (!parsedData.success) {
            setErrors({
                date: parsedData.error.formErrors.fieldErrors.date,
                hour: parsedData.error.formErrors.fieldErrors.hour,
                state: parsedData.error.formErrors.fieldErrors.state,
            })
            setIsLoading(false);
            return;
        }

        try {
            await fetch(`/api/updateAppointment`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: appointmentToEdit.id,
                    date: parsedData.data?.date as Date,
                    hour: parsedData.data?.hour,
                    state: parsedData.data?.state,
                })
            })
        } catch (error) {
            throw new Error('Failed to update the appointment')
        } finally {
            setIsLoading(false);
            fetchAllUsersAppointment();
            setShowPane(false);
        }
    }

    return (
        <div
            id="default-modal"
            tabIndex={-1}
            className="flex backdrop-brightness-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full"
        >
            <div className="relative p-4 w-full max-w-md">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <div className="flex items-center">
                            <h3 className="text-lg font-bold text-green-500 flex items-center">Edita la cita</h3>
                        </div>
                        <button
                            onClick={() => setShowPane(false)}
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <IoMdClose size={20} className="stroke-black hover:stroke-white" />
                        </button>
                    </div>

                    <div className="space-y-2 p-4">
                        <details className="border-2 p-4 [&_svg]:open:-rotate-180">
                            <summary className="flex cursor-pointer list-none items-center gap-4">
                                <IoIosArrowDown className="rotate-0 transform text-blue-700 transition-all duration-300" />
                                <div>Fecha</div>
                            </summary>
                            <input
                                className="mt-3 cursor-pointer text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                type="date"
                                value={date}
                                onChange={handleDateChange}
                            />
                            {errors && errors.date && (
                                <div>
                                    {errors.date.map((error, index) => <label key={index} className="text-xs font-mono text-red-500">{error}</label>)}
                                </div>
                            )}
                        </details>

                        <details className="border-2 p-4 [&_svg]:open:-rotate-180">
                            <summary className="flex cursor-pointer list-none items-center gap-4">
                                <IoIosArrowDown className="rotate-0 transform text-blue-700 transition-all duration-300" />
                                <div>Hora</div>
                            </summary>
                            <select onChange={handleTimeChange} id="hour" name="hour" value={hour} className="text-gray-800 bg-white border border-gray-300 w-full mt-3 text-sm px-4 py-3 rounded-md outline-blue-500 cursor-pointer">
                                {AVAILABLE_HOURS.map((availableHour) => (
                                    <option key={availableHour} value={availableHour} className={getStyledHour(availableHour)}>
                                        {availableHour.slice(0, 5)}
                                    </option>
                                ))}
                            </select>
                            {errors && errors.hour && (
                                <div>
                                    {errors.hour.map((error, index) => <label key={index} className="text-xs font-mono text-red-500">{error}</label>)}
                                </div>
                            )}
                        </details>

                        <details className="border-2 p-4 [&_svg]:open:-rotate-180">
                            <summary className="flex cursor-pointer list-none items-center gap-4">
                                <IoIosArrowDown className="rotate-0 transform text-blue-700 transition-all duration-300" />
                                <div>Estado de la cita</div>
                            </summary>
                            <select
                                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 mt-3 py-3 rounded-md outline-blue-500 cursor-pointer"
                                value={state}
                                onChange={handleStateChange}
                            >
                                <option value="Pendiente">Pendiente</option>
                                <option value="Realizada">Realizada</option>
                                <option value="Suspendida">Suspendida</option>
                            </select>
                        </details>
                    </div>

                    <div className="flex items-center p-4 md:p-5 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button
                            onClick={() => setShowPane(false)}
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Volver
                        </button>
                        <button
                            onClick={updateAppointment}
                            type="button"
                            className="text-white bg-green-400 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            {isLoading ? <ButtonLoader size="w-5 h-5" /> : 'Editar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
