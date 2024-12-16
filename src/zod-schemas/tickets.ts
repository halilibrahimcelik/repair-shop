import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { ticketsTable } from '@/db/schema';

import { z } from 'zod';

export const insertTicketSchema = createInsertSchema(ticketsTable, {
  id: z.union([z.number(), z.literal('New')]),
  title: (schema) => schema.min(2, 'Title is required'),
  description: (schema) => schema.min(2, 'Description is required').max(260),
  tech: (schema) => schema.email('Invalid email address'),
});

export const selectTicketSchema = createSelectSchema(ticketsTable);

export type InsertTicketSchemaType = typeof insertTicketSchema._type;
export type SelecctTicketSchemaType = typeof selectTicketSchema._type;
