import { loginAction } from "@/lib/actions";
import { getUser } from "@/lib/data";
import { getParsedCredentials } from "@/lib/schemas";
import { describe, vi, it, expect, Mock, beforeEach } from "vitest";
import bcrypt from "bcryptjs";
import { getPlainSession } from "@/lib/session";
import { mockSession, mockUser, validFormData } from "../../__mocks__/login";

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
