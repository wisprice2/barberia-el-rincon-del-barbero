import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createReservation, getReservationsByDate, getAllReservations } from "./db";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  reservations: router({
    create: publicProcedure
      .input(
        z.object({
          customerName: z.string().min(2),
          customerPhone: z.string().min(9),
          customerEmail: z.string().email().optional(),
          service: z.string().min(1),
          reservationDate: z.string(),
          reservationTime: z.string(),
          notes: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const reservation = await createReservation({
          customerName: input.customerName,
          customerPhone: input.customerPhone,
          customerEmail: input.customerEmail,
          service: input.service,
          reservationDate: input.reservationDate,
          reservationTime: input.reservationTime,
          notes: input.notes,
          status: "pending",
        });

        // Notificar al dueño
        await notifyOwner({
          title: "Nueva Reserva - Barbería Elite",
          content: `${input.customerName} ha reservado ${input.service} para ${input.reservationDate} a las ${input.reservationTime}. Teléfono: ${input.customerPhone}`,
        }).catch(err => console.error("Failed to notify owner:", err));

        return reservation;
      }),

    getAvailableSlots: publicProcedure
      .input(z.object({ date: z.string() }))
      .query(async ({ input }) => {
        const reservedSlots = await getReservationsByDate(input.date);
        const allSlots = [
          "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"
        ];
        
        const reserved = reservedSlots.map(r => r.reservationTime);
        const available = allSlots.filter(slot => !reserved.includes(slot));
        
        return { available, reserved };
      }),

    list: publicProcedure.query(async () => {
      return await getAllReservations();
    }),
  }),
});

export type AppRouter = typeof appRouter;
