// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql, relations } from "drizzle-orm";
import {
  index,
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

export const user = createTable("user", {
  // clerk generated
  id: varchar("id", { length: 256 }).primaryKey(),
  name: varchar("name", { length: 256 }),
  email: varchar("email", { length: 256 }).notNull(),
  profilePicture: text("profile_picture"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});

export const userRelations = relations(user, ({ many }) => ({
  posts: many(posts),
  comments: many(comments),
}));

export const posts = createTable("post", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  content: text("content"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});

export const postRelations = relations(posts, ({ one, many }) => ({
  author: one(user),
  comments: many(comments),
}));

export const comments = createTable("comments", {
  id: serial("id").primaryKey(),
  comment: varchar("name", { length: 256 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});

export const commentRelations = relations(comments, ({ one, many }) => ({
  author: one(user),
  post: one(posts),
  subComments: many(comments),
}));
