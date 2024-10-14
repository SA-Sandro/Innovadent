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
  try {
    await sql`INSERT INTO appointments (user_email, appointment_reason, date, hour)
    VALUES (${user_email}, ${appointment_reason}, ${date.toISOString()}, ${hour})`;
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
    const appointments =
      await sql<AppointmentData>`SELECT appointment_reason, date, hour FROM appointments WHERE user_email=${email}`;
    return appointments;
  } catch (error) {
    console.error("Error getting appointments by user: ", error);
  }
}
