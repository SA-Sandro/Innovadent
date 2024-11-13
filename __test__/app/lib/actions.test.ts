import { createAppointment, loginAction } from "@/lib/actions";
import { getUser } from "@/lib/data";
import { getParsedAppointmentData, getParsedCredentials } from "@/lib/schemas";
import { describe, vi, it, expect, Mock, beforeEach } from "vitest";
import bcrypt from "bcryptjs";
import getSession, { getPlainSession } from "@/lib/session";
import { mockSession, mockUser, validFormData } from "../../__mocks__/actions";

vi.mock("bcryptjs");
vi.mock("@/lib/data");
vi.mock("@/lib/schemas");
vi.mock("@/lib/session");

describe("test loginAction function", () => {
  beforeEach(() => {
    (getParsedCredentials as Mock).mockReturnValueOnce({
      success: true,
      data: { email: "usuario@gmail.com", password: "usuario11A" },
    });
  });

  it("should return error when credentials are not valid", async () => {
    (getUser as Mock).mockResolvedValueOnce(undefined);

    const result = await loginAction({ error: undefined }, validFormData);
    expect(result).toEqual({
      session: null,
      error: "Credenciales incorrectas",
    });
  });

  it("should return error when password does not match", async () => {
    (getUser as Mock).mockResolvedValueOnce(mockUser);
    (bcrypt.compare as Mock).mockReturnValueOnce(false);

    const result = await loginAction({ error: undefined }, validFormData);
    expect(result).toEqual({
      session: null,
      error: "Las credenciales aportadas son incorrectas",
    });
  });

  it("should return the actual session when password matches", async () => {
    (getUser as Mock).mockResolvedValueOnce(mockUser);
    (bcrypt.compare as Mock).mockReturnValueOnce(true);
    (getPlainSession as Mock).mockReturnValueOnce(mockSession);

    const result = await loginAction({ error: undefined }, validFormData);
    expect(result).toEqual({
      session: mockSession,
      error: undefined,
    });
  });
});

describe("test createAppointment function", () => {
  const mockFormData = {
    motive: "Caries",
    date: new Date(),
    hour: "16:00",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return an error object if the data is not correctly parsed", async () => {
    (getParsedAppointmentData as Mock).mockReturnValue({
      success: false,
      isSuccess: false,
      error: {
        formErrors: {
          fieldErrors: {
            date: mockFormData.date,
            hour: mockFormData.hour,
            motive: mockFormData.motive,
          },
        },
      },
      data: {
        motive: undefined,
        date: undefined,
        hour: undefined,
      },
    });

    const result = await createAppointment(
      { error: { reason: undefined, date: undefined, hour: undefined } },
      validFormData
    );

    expect(result.error.date).toBeTruthy();
    expect(result.error.reason).toBeTruthy();
    expect(result.error.hour).toBeTruthy();
    expect(result.isSuccess).toBeFalsy();
  });

  it("should not return any error when parsed data is success", async () => {
    (getParsedAppointmentData as Mock).mockReturnValue({
      success: true,
      isSuccess: true,
      error: {
        formErrors: {
          fieldErrors: {
            date: undefined,
            hour: undefined,
            motive: undefined,
          },
        },
      },
      data: {
        motive: "",
        date: new Date(),
        hour: "",
      },
    });

    (getSession as Mock).mockReturnValue({});

    const result = await createAppointment(
      { error: { reason: undefined, date: undefined, hour: undefined } },
      validFormData
    );

    expect(result.isSuccess).toBeTruthy();
    expect(result.error.hour).toBeUndefined();
    expect(result.error.reason).toBeUndefined();
    expect(result.error.date).toBeUndefined();
    expect(result.appointmentDate).toBeTruthy();
  });
});
