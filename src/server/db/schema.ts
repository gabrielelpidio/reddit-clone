// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql, relations } from "drizzle-orm";
import {
  uniqueIndex,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  text,
} from "drizzle-orm/pg-core";

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
  posts: many(posts),
  comments: many(comments),
}));

export const posts = createTable("post", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }),
  content: text("content"),
  authorId: varchar("author_id", { length: 256 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, { fields: [posts.authorId], references: [users.id] }),
  comments: many(comments),
}));

export const comments = createTable("comments", {
  id: serial("id").primaryKey(),
  comment: varchar("name", { length: 256 }),
  authorId: varchar("author_id", { length: 256 }).notNull(),
  postId: serial("post_id").notNull(),
  parentId: serial("parent_id"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});

export const commentHierarchyRelations = relations(
  comments,
  ({ one, many }) => ({
    parent: one(comments, {
      fields: [comments.parentId],
      references: [comments.id],
    }),
    children: many(comments),
  }),
);

export const commentsRelations = relations(comments, ({ one }) => ({
  author: one(users, { fields: [comments.authorId], references: [users.id] }),
  post: one(posts, { fields: [comments.postId], references: [posts.id] }),
}));
