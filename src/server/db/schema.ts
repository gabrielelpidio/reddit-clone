// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql, relations } from "drizzle-orm";
import {
  pgTableCreator,
  timestamp,
  varchar,
  text,
  smallint,
  index,
} from "drizzle-orm/pg-core";

import { createId } from "@paralleldrive/cuid2";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `reddit-clone_${name}`);

export const users = createTable("users", {
  // clerk generated
  id: varchar("id", { length: 256 }).notNull().primaryKey(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  username: text("username"),
  email: varchar("email", { length: 256 }).notNull(),
  profilePicture: text("profile_picture"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts, { relationName: "author_posts" }),
  comments: many(comments, { relationName: "author_comments" }),
  votes: many(votes, { relationName: "user_votes" }),
}));

export const posts = createTable("post", {
  id: varchar("id", { length: 128 })
    .primaryKey()
    .$defaultFn(() => createId()),
  title: varchar("title", { length: 256 }),
  content: text("content"),
  authorId: varchar("author_id", { length: 256 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
    relationName: "author_posts",
  }),
  comments: many(comments, { relationName: "post_comments" }),
  votes: many(votes, { relationName: "post_votes" }),
}));

export const comments = createTable("comments", {
  id: varchar("id", { length: 128 })
    .primaryKey()
    .$defaultFn(() => createId()),
  comment: varchar("name", { length: 256 }).notNull(),
  authorId: varchar("author_id", { length: 256 }).notNull(),
  postId: varchar("post_id", { length: 128 }).notNull(),
  parentId: varchar("parent_id", { length: 128 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});

export const commentsRelations = relations(comments, ({ one, many }) => ({
  author: one(users, {
    fields: [comments.authorId],
    references: [users.id],
    relationName: "author_comments",
  }),
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
    relationName: "post_comments",
  }),
  parent: one(comments, {
    fields: [comments.parentId],
    references: [comments.id],
    relationName: "comment_children",
  }),
  votes: many(votes, { relationName: "comment_votes" }),
  children: many(comments, { relationName: "comment_children" }),
}));

export const votes = createTable(
  "votes",
  {
    id: varchar("id", { length: 128 })
      .primaryKey()
      .$defaultFn(() => createId()),
    userId: varchar("user_id", { length: 256 }).notNull(),
    postId: varchar("post_id", { length: 128 }),
    commentId: varchar("comment_id", { length: 128 }),
    value: smallint("value").notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (table) => ({
    postIdIdx: index("post_id_idx").on(table.postId),
    commentIdIdx: index("comment_id_idx").on(table.commentId),
    userIdIdx: index("user_id_idx").on(table.userId),
  }),
);

export const votesRelations = relations(votes, ({ one }) => ({
  user: one(users, {
    fields: [votes.userId],
    references: [users.id],
    relationName: "user_votes",
  }),
  post: one(posts, {
    fields: [votes.postId],
    references: [posts.id],
    relationName: "post_votes",
  }),
  comment: one(comments, {
    fields: [votes.commentId],
    references: [comments.id],
    relationName: "comment_votes",
  }),
}));
