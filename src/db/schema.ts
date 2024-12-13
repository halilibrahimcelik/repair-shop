import { relations } from 'drizzle-orm';
import {
  pgTable,
  varchar,
  timestamp,
  text,
  serial,
  boolean,
  integer,
} from 'drizzle-orm/pg-core';

export const customersTable = pgTable('customers', {
  id: serial().primaryKey(),
  firstName: varchar('firs_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  phone: varchar('phone').unique().notNull(),
  address1: varchar('address1').notNull(),
  address2: varchar('address2'),
  city: varchar('city').notNull(),
  state: varchar('state', { length: 2 }).notNull(),
  postCode: varchar('post_code', { length: 10 }).notNull(),
  notes: text(),
  active: boolean().notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const ticketsTable = pgTable('tickets', {
  id: serial().primaryKey(),
  customersId: integer()
    .notNull()
    .references(() => customersTable.id),
  title: varchar('title').notNull(),
  description: text('description'),
  completed: boolean('completed').notNull().default(false),
  tech: varchar('tech').notNull().default('unassigned'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const customersRelations = relations(customersTable, ({ many }) => {
  return {
    tickets: many(ticketsTable),
  };
});

export const ticketsRelations = relations(ticketsTable, ({ one }) => {
  return {
    customer: one(customersTable, {
      fields: [ticketsTable.customersId],
      references: [customersTable.id],
    }),
  };
});
