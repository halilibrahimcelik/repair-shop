import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { customersTable } from '@/db/schema';

export const insertCustomerSchema = createInsertSchema(customersTable, {
  firstName: (schema) => schema.min(2, 'First name is required').max(255),
  lastName: (schema) => schema.min(2, 'Last name is required').max(255),
  address1: (schema) => schema.min(2, 'Address is required').max(255),
  email: (schema) => schema.email('Invalid email address').max(255),
  city: (schema) => schema.min(2, 'City is required'),
  phone: (schema) => schema.min(10, 'Phone number is required').max(15),
});

export const selectCustomerSchema = createSelectSchema(customersTable);

export type InsertCustomerSchemaType = typeof insertCustomerSchema._type;
export type SelectCusctomerSchemaType = typeof selectCustomerSchema._type;
