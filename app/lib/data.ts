"use server";

import { QueryResult, QueryResultRow, sql } from "@vercel/postgres";
import { AppointmentData, User } from "./definitions";

export async function userRegistration(
  username: string,
  email: string,
  password: string,
  image_url: string
) {
  try {
    const result =
      await sql`INSERT INTO users (username, email, password, image_url)
    VALUES (${username}, ${email}, ${password}, ${image_url})`;
    return result;
  } catch (error) {
    console.error("Error registering user: ", error);
    throw new Error("Error registering user");
  }
}

export async function getEmailsByEmail(email: string) {
  try {
    const emails = await sql`SELECT email FROM users WHERE email=${email}`;
    return emails;
  } catch (error) {
    console.error("Error getting emails:", error);
    throw new Error("Error getting user");
  }
}

export async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function postAppointment(
  user_email: string,
  appointment_reason: string,
  date: Date,
  hour: string
) {
  const state: string = "Pendiente";
  try {
    await sql`INSERT INTO appointments (user_email, appointment_reason, date, hour, state)
    VALUES (${user_email}, ${appointment_reason}, ${date.toISOString()}, ${hour}, ${state})`;
  } catch (error) {
    console.error("Error posting appointments ", error);
  }
}

export async function getBookedHourByDate(selectedDate: Date) {
  try {
    const bookedHoursByDate =
      await sql`SELECT hour FROM appointments WHERE date = ${selectedDate.toISOString()}`;

    if (!bookedHoursByDate || bookedHoursByDate.rowCount! < 1) return undefined;

    const arrayHours: Array<string> = [];
    bookedHoursByDate.rows.map((row) => arrayHours.push(row.hour));

    return arrayHours;
  } catch (error) {
    console.error("Error getting booked hours: ", error);
  }
}

export async function getUserAppointments(
  email: string
): Promise<QueryResult<QueryResultRow> | undefined> {
  try {
    return await sql<AppointmentData>`
  SELECT id, appointment_reason, date, hour, state
  FROM appointments
  WHERE user_email = ${email} AND state NOT IN ('Suspendida', 'Realizada');
`;
  } catch (error) {
    console.error("Error getting appointments by user: ", error);
  }
}

export async function getAllUsersAppointment() {
  try {
    return await sql<AppointmentData>`
      SELECT u.username, u.image_url, a.appointment_reason, a.user_email, a.date, a.hour, a.state
      FROM users AS u
      JOIN appointments AS a ON u.email = a.user_email
      WHERE state NOT IN ('Suspendida', 'Realizada');
      `;
  } catch (error) {
    console.error("Error getting all users appointment: ", error);
  }
}

export async function updateAppointmentState(id: string) {
  try {
    await sql`UPDATE appointments SET state='Suspendida' WHERE id = ${id}`;
  } catch (error) {
    console.error("Error updating the appointment: ", error);
  }
}
