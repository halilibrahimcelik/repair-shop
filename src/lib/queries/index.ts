import { db } from '@/db';
import { customersTable, ticketsTable } from '@/db/schema';

import { eq, ilike, or } from 'drizzle-orm';
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

export const getCustomerSearchResults = async (searchText: string) => {
  try {
    const customers = await db
      .select()
      .from(customersTable)
      .where(
        or(
          ilike(customersTable.firstName, `%${searchText}%`),
          ilike(customersTable.lastName, `%${searchText}%`),
          ilike(customersTable.email, `%${searchText}%`),
          ilike(customersTable.state, `%${searchText}%`),
          ilike(customersTable.address1, `%${searchText}%`),
          ilike(customersTable.phone, `%${searchText}%`)
        )
      );
    return customers;
    //ilike case insensitive search
  } catch (error) {
    console.log(error);
    captureSentryException({
      message: 'Error in getCustomerSearchResults',
      title: 'Error in getCustomerSearchResults',
    });
  }
};
