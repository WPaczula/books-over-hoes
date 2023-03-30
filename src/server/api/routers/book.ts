import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const bookRouter = createTRPCRouter({
  getPaged: protectedProcedure.input(z.object({ page: z.number().min(0), size: z.number().min(10) })).query(async ({input, ctx}) => {
    const userId = ctx.session.user.id

    const books = await prisma.book.findMany({ where: {userId}, take: input.size, skip: input.page * input.size })

    return books
  }),
});
