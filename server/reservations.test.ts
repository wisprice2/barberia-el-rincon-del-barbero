import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock de la base de datos
vi.mock("./db", () => ({
  createReservation: vi.fn(async (data) => ({
    id: 1,
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  })),
  getReservationsByDate: vi.fn(async () => []),
  getAllReservations: vi.fn(async () => []),
}));

// Mock de notificaciones
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn(async () => true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("reservations router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a reservation with valid input", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.reservations.create({
      customerName: "Juan Perez",
      customerPhone: "+56912345678",
      customerEmail: "juan@example.com",
      service: "Corte Clasico",
      reservationDate: "2026-04-05",
      reservationTime: "16:00",
      notes: "Sin barba",
    });

    expect(result).toBeDefined();
    expect(result.customerName).toBe("Juan Perez");
    expect(result.customerPhone).toBe("+56912345678");
    expect(result.service).toBe("Corte Clasico");
    expect(result.status).toBe("pending");
  });

  it("validates required fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.reservations.create({
        customerName: "",
        customerPhone: "+56912345678",
        service: "Corte Clasico",
        reservationDate: "2026-04-05",
        reservationTime: "16:00",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.code).toBe("BAD_REQUEST");
    }
  });

  it("validates email format when provided", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.reservations.create({
        customerName: "Juan Perez",
        customerPhone: "+56912345678",
        customerEmail: "invalid-email",
        service: "Corte Clasico",
        reservationDate: "2026-04-05",
        reservationTime: "16:00",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.code).toBe("BAD_REQUEST");
    }
  });

  it("retrieves available slots for a date", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.reservations.getAvailableSlots({
      date: "2026-04-05",
    });

    expect(result).toBeDefined();
    expect(result.available).toBeInstanceOf(Array);
    expect(result.reserved).toBeInstanceOf(Array);
    expect(result.available.length).toBeGreaterThan(0);
  });

  it("lists all reservations", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.reservations.list();

    expect(result).toBeInstanceOf(Array);
  });
});
