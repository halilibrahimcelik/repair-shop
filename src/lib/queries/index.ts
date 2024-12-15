import { db } from '@/db';
import { customersTable, ticketsTable } from '@/db/schema';

import { eq } from 'drizzle-orm';
import { captureSentryException } from '../utils';

export const getCustomer = async (id: number) => {
  try {
    const customer = await db
      .select()
      .from(customersTable)
      .where(eq(customersTable.id, id));
    return customer[0] || null;
  } catch (error) {
    console.log(error);
    captureSentryException({
      message: 'Error in getCustomer',
      title: 'Error in getCustomer',
    });
  }
};
export const getTicket = async (id: number) => {
  try {
    const ticket = await db
      .select()
      .from(ticketsTable)
      .where(eq(ticketsTable.id, id));
    return ticket[0];
  } catch (error) {
    console.log(error);
    captureSentryException({
      message: 'Error in  Get single Tickets',
      title: 'Error in Tickets',
    });
  }
};
