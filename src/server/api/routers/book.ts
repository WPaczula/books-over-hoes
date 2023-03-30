import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const bookRouter = createTRPCRouter({
  getPaged: protectedProcedure.input(z.object({ page: z.number().min(0), size: z.number().min(10) })).query(async ({input, ctx}) => {
    const userId = ctx.session.user.id

    const books = await ctx.prisma.book.findMany({ where: {userId}, take: input.size, skip: input.page * input.size })

    return books
  }),

  adjustNeedsReview: protectedProcedure.input(z.object({ id: z.string().cuid(), needsReview: z.boolean() })).mutation(async ({ctx, input}) => {
    const userId = ctx.session.user.id
    const book = await ctx.prisma.book.findUnique({where: {id: input.id}})

    if (!book || book.userId !== userId) {
        throw new TRPCError({code: 'NOT_FOUND', message: 'Book not found'})
    }

    book.needsReview = input.needsReview

    if (book.status !== 'TO_BE_READ') {
        if (book.status === 'COMPLETED' && !book.reviewAdded && input.needsReview) {
            book.status = 'AWAITING_REVIEW'
        } else if (book.status === 'AWAITING_REVIEW' && !input.needsReview) {
            book.status = 'COMPLETED'
        }
    }

    await ctx.prisma.book.update({where: {id: input.id}, data: book})

    return book
  })
});
