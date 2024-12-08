import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  varchar,
  timestamp,
  text,
  serial,
} from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const postsTable = pgTable('posts', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  content: varchar({ length: 255 }).notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const commentsTable = pgTable('comments', {
  id: serial('id').primaryKey(),
  postIId: integer('post_id').references(() => postsTable.id),
  userId: integer('user_id').references(() => usersTable.id),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
export const postRelations = relations(postsTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [postsTable.userId],
    references: [usersTable.id],
  }),
  comments: many(commentsTable),
}));

export const usersRelations = relations(usersTable, ({ many }) => ({
  posts: many(postsTable),
}));

export const commentsRelations = relations(commentsTable, ({ one }) => ({
  post: one(postsTable, {
    fields: [commentsTable.id],
    references: [postsTable.id],
  }),
  user: one(usersTable, {
    fields: [commentsTable.userId],
    references: [usersTable.id],
  }),
}));
