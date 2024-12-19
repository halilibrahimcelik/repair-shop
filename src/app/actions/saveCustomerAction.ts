'use server';
import { eq } from 'drizzle-orm';
import { flattenValidationErrors } from 'next-safe-action';
import { redirect } from 'next/navigation';

import { db } from '@/db';

import { customersTable } from '@/db/schema';
import { actionClient } from '@/lib/safe-action';

import {
  insertCustomerSchema,
  InsertCustomerSchemaType,
} from '@/zod-schemas/customer';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export const saveCustomerAction = actionClient
  .metadata({
    actionName: 'saveCustomerAction',
  })
  .schema(insertCustomerSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(
    async ({
      parsedInput: customer,
    }: {
      parsedInput: InsertCustomerSchemaType;
    }) => {
      const { isAuthenticated } = getKindeServerSession();

      const isAuth = await isAuthenticated();
      if (!isAuth) {
        redirect('/login');
      }
      //New Customer case
      if (customer.id === 0) {
        const result = await db
          .insert(customersTable)
          .values({
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            phone: customer.phone,
            address1: customer.address1,
            ...(customer?.address2?.trim()
              ? { address2: customer.address2 }
              : {}),
            city: customer.city,
            state: customer.state,
            postCode: customer.postCode,
            ...(customer?.notes?.trim() ? { notes: customer.notes } : {}),
          })
          .returning({
            insertedId: customersTable.id,
          });
        return {
          message: `Customer ID #${result[0].insertedId} created successfully `,
        };
      }

      //Existing Customer
      const result = await db
        .update(customersTable)
        .set({
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          address1: customer.address1,
          address2: customer.address2?.trim() ?? null,
          city: customer.city,
          state: customer.state,
          postCode: customer.postCode,
          notes: customer?.notes?.trim() ?? null,
        })
        .where(eq(customersTable.id, customer.id!))
        .returning({
          updatedId: customersTable.id,
        });

      return {
        message: `Customer ID #${result[0].updatedId} updated succesfully `,
      };
    }
  );
