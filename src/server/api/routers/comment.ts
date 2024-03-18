import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import * as schema from "~/server/db/schema";

export const commentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        content: z.string().trim().min(1),
        parentId: z.string().optional(),
        postId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (db) => {
        await db.insert(schema.comments).values({
          comment: input.content,
          authorId: ctx.session.userId,
          parentId: input.parentId,
          postId: input.postId,
        });
      });
    }),
});
