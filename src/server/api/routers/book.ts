import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  type TRPCContext,
} from "~/server/api/trpc";

async function findBook(ctx: TRPCContext, id: string) {
  const userId = ctx.session?.user.id;
  const book = await ctx.prisma.book.findUnique({ where: { id } });

  if (!book || book.userId !== userId) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'Book not found' });
  }
  return book;
}


export const bookRouter = createTRPCRouter({
  getPaged: protectedProcedure.input(z.object({ page: z.number().min(0), size: z.number().min(1) })).query(async ({input, ctx}) => {
    const userId = ctx.session?.user.id

    const books = await ctx.prisma.book.findMany({ where: {userId}, take: input.size, skip: input.page * input.size })
    const booksCount = await ctx.prisma.book.count({where: {userId}})

    return { content: books, totalCount: booksCount, pageCount: Math.ceil(booksCount / input.size) }
  }),

  adjustNeedsReview: protectedProcedure.input(z.object({ id: z.string().cuid(), needsReview: z.boolean() })).mutation(async ({ctx, input}) => {
    const book = await findBook(ctx, input.id);

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
  }),

  adjustHasAudiobook: protectedProcedure.input(z.object({ id: z.string().cuid(), hasAudiobook: z.boolean() })).mutation(async ({ctx, input}) => {
    const book = await findBook(ctx, input.id);

    book.hasAudioBook = input.hasAudiobook

    await ctx.prisma.book.update({where: {id: input.id}, data: book})

    return book
  }),

  adjustReadAt: protectedProcedure.input(z.object({ id: z.string().cuid(), readAt: z.date().nullable() })).mutation(async ({ctx, input}) => {
    const book = await findBook(ctx, input.id);

    book.readAt = input.readAt
    if (book.status === 'TO_BE_READ') {
      if (book.needsReview) {
        book.status = 'AWAITING_REVIEW'
      } else if (!book.needsReview) {
        book.status = 'COMPLETED'
      }
    } else {
      book.status = 'TO_BE_READ'
    }

    await ctx.prisma.book.update({where: {id: input.id}, data: book})

    return book
  }),
});

