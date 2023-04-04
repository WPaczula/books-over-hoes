import { type Book } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  type TRPCContext,
} from "~/server/api/trpc";
import { type BookStatus } from "~/types/BookStatus";

async function findBook(ctx: TRPCContext, id: string) {
  const userId = ctx.session?.user.id;
  const book = await ctx.prisma.book.findUnique({ where: { id } });

  if (!book || book.userId !== userId) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'Book not found' });
  }
  return book;
}

const inferBookStatus = (book: Book): BookStatus => {
  if (!book.readAt) {
    return 'TO_BE_READ'
  }

  if (book.needsReview && !book.hasReview) {
    return 'AWAITING_REVIEW'
  }

  if (!book.posted) {
    return 'TO_BE_POSTED'
  }

  return 'COMPLETED'
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
    book.status = inferBookStatus(book)

    await ctx.prisma.book.update({where: {id: input.id}, data: book})

    return book
  }),

  adjustHasAudiobook: protectedProcedure.input(z.object({ id: z.string().cuid(), hasAudiobook: z.boolean() })).mutation(async ({ctx, input}) => {
    const book = await findBook(ctx, input.id);

    book.hasAudioBook = input.hasAudiobook

    await ctx.prisma.book.update({where: {id: input.id}, data: book})

    return book
  }),

  adjustHasReview: protectedProcedure.input(z.object({ id: z.string().cuid(), hasReview: z.boolean() })).mutation(async ({ctx, input}) => {
    const book = await findBook(ctx, input.id);

    book.hasReview = input.hasReview
    book.status = inferBookStatus(book)

    await ctx.prisma.book.update({where: {id: input.id}, data: book})

    return book
  }),

  adjustPosted: protectedProcedure.input(z.object({ id: z.string().cuid(), posted: z.boolean() })).mutation(async ({ctx, input}) => {
    const book = await findBook(ctx, input.id);

    book.posted = input.posted
    book.status = inferBookStatus(book)

    await ctx.prisma.book.update({where: {id: input.id}, data: book})

    return book
  }),

  adjustReadAt: protectedProcedure.input(z.object({ id: z.string().cuid(), readAt: z.date().nullable() })).mutation(async ({ctx, input}) => {
    const book = await findBook(ctx, input.id);

    book.readAt = input.readAt
    book.status = inferBookStatus(book)
    
    await ctx.prisma.book.update({where: {id: input.id}, data: book})

    return book
  }),
});

