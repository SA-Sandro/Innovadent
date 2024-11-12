import { getBookedHourByDate } from "@/lib/data";
import {
  getParsedAppointmentData,
  getParsedAppointmentToUpdate,
  getParsedConfirmPassword,
  getParsedCredentials,
  getParsedPassword,
  getParsedPhoto,
  getParsedUsername,
} from "@/lib/schemas";
import { beforeEach } from "vitest";
import { Mock } from "vitest";
import { describe, vi, it, expect } from "vitest";

vi.mock("@/lib/data", () => ({
  getBookedHourByDate: vi.fn(),
}));

const mockGetBookedHourByDate = getBookedHourByDate as Mock;

describe("test getParsedCredentials", () => {
  it("should validate credentials according to different test cases", () => {
    const testCases = [
      {
        input: { email: "", password: "validPassword123" },
        expectedError: true,
      },
      {
        input: { email: "valid@example.com", password: "" },
        expectedError: true,
      },
      {
        input: { email: "invalid-email", password: "validPassword123" },
        expectedError: true,
      },
      {
        input: { email: "valid@example.com", password: "123" },
        expectedError: true,
      },
      {
        input: { email: "valid@example.com", password: "validPassword123" },
        expectedError: false,
      },
    ];

    testCases.forEach(({ input, expectedError }) => {
      const result = getParsedCredentials(input);

      if (expectedError) {
        expect(result.success).toBe(false);
      } else {
        expect(result.success).toBe(true);
      }
    });
  });
});

describe("test getParsedUsername", () => {
  it("should validate Username according to different test cases", () => {
    const testCases = [
      {
        username: 123142423,
        expectedError: true,
      },
      {
        username: "san",
        expectedError: true,
      },
      {
        username:
          "alñskfjñlkasdjflkasjdflñasjdflasdlñkfjñasdjfñaskdfjasñdfaskld",
        expectedError: true,
      },
      {
        username: "Alfredo",
        expectedError: false,
      },
      {
        username: "Alfredito de sant",
        expectedError: false,
      },
    ];

    testCases.map(({ username, expectedError }) => {
      const result = getParsedUsername(username as string);
      if (expectedError) {
        expect(result.success).toBeFalsy();
      } else {
        expect(result.success).toBeTruthy();
      }
    });
  });
});

describe("test getParsedPassowrd function", () => {
  it("should validate Password according to different test cases", () => {
    const testCases = [
      {
        password: "asdfs",
        expectedError: true,
      },
      {
        password: "añlsdkfjlaskdjflkasjdflkasdfsfasfd",
        expectedError: true,
      },
      {
        password: "alfredoA",
        expectedError: true,
      },
      {
        password: "alfredo11A",
        expectedError: false,
      },
      {
        password: "ALFREDO11A",
        expectedError: true,
      },
      {
        password: "franciscoA11Galvarzola11",
        expectedError: true,
      },
    ];

    testCases.map(({ password, expectedError }) => {
      const result = getParsedPassword(password);
      if (expectedError) {
        expect(result.success).toBeFalsy();
      } else {
        expect(result.success).toBeTruthy();
      }
    });
  });
});

describe("test getParsedConfirmPassword function", () => {
  it("should validate if password matchs according to different test cases", () => {
    const testCases = [
      {
        confirmPassword: "alfredo11A",
        password: "alfredo11A",
        expectedError: false,
      },
      {
        confirmPassword: "alfredo11",
        password: "alfredo11A",
        expectedError: true,
      },
    ];

    testCases.map(({ confirmPassword, password, expectedError }) => {
      const result = getParsedConfirmPassword(confirmPassword!, password);
      if (expectedError) {
        expect(result.success).toBeFalsy();
        expect(result.error?.errors[0].message).toEqual(
          "Las contraseñas no coinciden"
        );
      } else {
        expect(result.success).toBeTruthy();
      }
    });
  });
});

describe("test getParsedPhoto function", () => {
  it("should return an error when the file extension is invalid", () => {
    const mockFile = new File(["a".repeat(1024 * 1024)], "emptyImage.svg", {
      type: "image/svg+xml",
    });

    const result = getParsedPhoto(mockFile);
    expect(result.success).toBeFalsy();
    expect(result.error?.errors[0].message).toEqual(
      "La extensión del archivo es inválida. "
    );
  });

  it("should return an error when the file size is heavier than 3mb", () => {
    const mockFile = new File(["a".repeat(1024 * 10024)], "emptyImage.png", {
      type: "image/png",
    });

    const result = getParsedPhoto(mockFile);
    expect(result.success).toBeFalsy();
    expect(result.error?.errors[0].message).toEqual(
      "La imagen debe de pesar menos de 3Mb. "
    );
  });

  it("should return the parsed file if there are not errors", () => {
    const mockFile = new File(["a".repeat(1024 * 1024)], "emptyImage.png", {
      type: "image/png",
    });

    const result = getParsedPhoto(mockFile);
    expect(result.success).toBeTruthy();
  });
});

describe("test getParsedAppointmentData function", () => {
  beforeEach(() => {
    mockGetBookedHourByDate.mockResolvedValue([
      "10:00",
      "15:00",
      "16:00",
      "9:00",
    ]);
  });

  it("should pass with valid data", async () => {
    const mockFormData = {
      motive: "Caries",
      date: new Date(Date.now() + 24 * 60 * 60 * 1000),
      hour: "11:00",
    };

    const result = await getParsedAppointmentData(mockFormData);
    expect(result.success).toBeTruthy();
  });

  it("should return custom error when motive is empty", async () => {
    const mockFormData = {
      motive: "",
      date: new Date(Date.now() + 24 * 60 * 60 * 1000),
      hour: "11:00",
    };

    const result = await getParsedAppointmentData(mockFormData);
    expect(result.success).toBeFalsy();
    expect(result.error?.errors[0].message).toEqual("Este campo es requerido");
  });

  it("should return custom error when motive exceed 300 characters", async () => {
    const mockFormData = {
      motive: "a".repeat(301),
      date: new Date(Date.now() + 24 * 60 * 60 * 1000),
      hour: "11:00",
    };

    const result = await getParsedAppointmentData(mockFormData);
    expect(result.success).toBeFalsy();
    expect(result.error?.errors[0].message).toEqual(
      "El texto no debe de superar los 300 caracteres"
    );
  });

  it("should return custom error when the selected day is less than the current date", async () => {
    const mockFormData = {
      motive: "caries",
      date: new Date(),
      hour: "11:00",
    };

    const result = await getParsedAppointmentData(mockFormData);
    expect(result.success).toBeFalsy();
    expect(result.error?.errors[0].message).toEqual(
      "La fecha elegida debe de ser mayor a la actual"
    );
  });

  it("should return custom error when the hour input is empty", async () => {
    const mockFormData = {
      motive: "caries",
      date: new Date(Date.now() + 24 * 60 * 60 * 1000),
      hour: "",
    };

    const result = await getParsedAppointmentData(mockFormData);
    expect(result.success).toBeFalsy();
    expect(result.error?.errors[0].message).toEqual("Este campo es requerido");
  });

  it("should return custom error when the hour input exceed the maximun characters", async () => {
    const mockFormData = {
      motive: "caries",
      date: new Date(Date.now() + 24 * 60 * 60 * 1000),
      hour: "11:00".repeat(21), //5*21=105 characters
    };

    const result = await getParsedAppointmentData(mockFormData);
    expect(result.success).toBeFalsy();
    expect(result.error?.errors[0].message).toEqual(
      "Este campo excede los 100 caracteres"
    );
  });

  it("should return custom error when the selected hour is already booked", async () => {
    const mockFormData = {
      motive: "caries",
      date: new Date(Date.now() + 24 * 60 * 60 * 1000),
      hour: "16:00",
    };

    const result = await getParsedAppointmentData(mockFormData);
    expect(result.success).toBeFalsy();
    expect(result.error?.errors[0].message).toEqual(
      "Esta hora ya está reservada"
    );
  });
});

describe("test getParsedAppointmentToUpdate", () => {
  beforeEach(() => {
    mockGetBookedHourByDate.mockResolvedValue([
      "10:00",
      "15:00",
      "16:00",
      "9:00",
    ]);
  });

  it("should return a custom error if selected date is less than the current date", async () => {
    const currentHour = "16:00";
    const mockFormData = {
      date: new Date(),
      hour: "13:00",
      state: "Pending",
    };

    const result = await getParsedAppointmentToUpdate(
      mockFormData,
      currentHour
    );
    expect(result.success).toBeFalsy();
    expect(result.error?.errors[0].message).toEqual(
      "La fecha elegida debe ser mayor a la actual"
    );
  });

  it("should return a custom error if selected date is less than the current date", async () => {
    const currentHour = "15:00";
    const mockFormData = {
      date: new Date(),
      hour: "13:00",
      state: "Pending",
    };

    const result = await getParsedAppointmentToUpdate(
      mockFormData,
      currentHour
    );
    expect(result.success).toBeFalsy();
    expect(result.error?.errors[0].message).toEqual(
      "La fecha elegida debe ser mayor a la actual"
    );
  });

  it("should return a custom error if selected date is less than the current date", async () => {
    const currentHour = "15:00";
    const mockFormData = {
      date: new Date(Date.now() + 24 * 60 * 60 * 1000),
      hour: "16:00",
      state: "Pending",
    };

    const result = await getParsedAppointmentToUpdate(
      mockFormData,
      currentHour
    );
    expect(result.success).toBeFalsy();
    expect(result.error?.errors[0].message).toEqual(
      "Esta hora ya está reservada"
    );
  });

  it("should pass if data to update is valid", async () => {
    const currentHour = "15:00";
    const mockFormData = {
      date: new Date(Date.now() + 24 * 60 * 60 * 1000),
      hour: "13:00",
      state: "Pending",
    };

    const result = await getParsedAppointmentToUpdate(
      mockFormData,
      currentHour
    );
    expect(result.success).toBeTruthy();
  });
});
