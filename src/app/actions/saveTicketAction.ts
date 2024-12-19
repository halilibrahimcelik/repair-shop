"'use server'";
import { eq } from 'drizzle-orm';
import { flattenValidationErrors } from 'next-safe-action';
import { redirect } from 'next/navigation';

import { db } from '@/db';

import { ticketsTable } from '@/db/schema';
import { actionClient } from '@/lib/safe-action';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import {
  insertTicketSchema,
  InsertTicketSchemaType,
} from '@/zod-schemas/tickets';

export const saveTicketAction = actionClient
  .metadata({
    actionName: 'saveTicketAction',
  })
  .schema(insertTicketSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(
    async ({
      parsedInput: ticket,
    }: {
      parsedInput: InsertTicketSchemaType;
    }) => {
      const { isAuthenticated } = getKindeServerSession();
      if (!isAuthenticated) {
        redirect('/login');
      }

      //New Ticket case
      if (ticket.id === 'New') {
        const result = await db
          .insert(ticketsTable)
          .values({
            customersId: ticket.customersId,
            title: ticket.title,
            description: ticket.description,
            tech: ticket.tech,
          })
          .returning({
            insertedId: ticketsTable.id,
          });
        return {
          message: `Ticket ID #${result[0].insertedId} created successfully`,
        };
      }

      //Update Ticket case
      const result = await db
        .update(ticketsTable)
        .set({
          customersId: ticket.customersId,
          title: ticket.title,
          description: ticket.description,
          tech: ticket.tech,
          completed: ticket.completed,
        })
        .where(eq(ticketsTable.id, ticket.id))
        .returning({
          updatedId: ticketsTable.id,
        });
      return {
        message: `Ticket ID #${result[0].updatedId} updated succesfully `,
      };
    }
  );
