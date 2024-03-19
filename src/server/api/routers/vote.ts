import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import * as schema from "~/server/db/schema";

export const voteRouter = createTRPCRouter({
  send: protectedProcedure
    .input(
      z.object({
        parentId: z.string(),
        parentType: z.enum(["post", "comment"]),
        value: z.enum(["up", "down"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (db) => {
        const existingVote = await db.query.votes.findFirst({
          where: (table, { eq, and }) =>
            and(
              eq(table.userId, ctx.session.userId),
              input.parentType === "comment"
                ? eq(table.commentId, input.parentId)
                : eq(table.postId, input.parentId),
            ),
        });

        if (typeof existingVote === "undefined") {
          await db.insert(schema.votes).values({
            userId: ctx.session.userId,
            value: input.value === "up" ? 1 : -1,
            commentId: input.parentType === "comment" ? input.parentId : null,
            postId: input.parentType === "post" ? input.parentId : null,
          });
          return;
        }

        if (existingVote.value === (input.value === "up" ? 1 : -1)) {
          await db
            .delete(schema.votes)
            .where(eq(schema.votes.id, existingVote.id));
          return;
        }

        await db
          .update(schema.votes)
          .set({
            value: input.value === "up" ? 1 : -1,
          })
          .where(eq(schema.votes.id, existingVote.id));
      });
    }),
});
