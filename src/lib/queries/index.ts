'use server';
import { db } from '@/db';
import { customersTable, ticketsTable } from '@/db/schema';

import { asc, eq, ilike, or, sql } from 'drizzle-orm';
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
export const getAllCustomers = async () => {
  try {
    const customers = await db.select().from(customersTable);
    return customers || [];
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      captureSentryException({
        message: 'Error in getAllCustomers',
        title: 'Error in getAllCustomers',
      });
    }
  }
};

export const getCustomerSearchResults = async (searchText: string) => {
  try {
    const customers = await db
      .select()
      .from(customersTable)
      .where(
        or(
          // ilike(customersTable.firstName, `%${searchText}%`),
          // ilike(customersTable.lastName, `%${searchText}%`),
          ilike(customersTable.email, `%${searchText}%`),
          ilike(customersTable.city, `%${searchText}%`),
          ilike(customersTable.phone, `%${searchText}%`),
          sql`lower(concat(${customersTable.firstName}, ' ', ${
            customersTable.lastName
          })) LIKE ${`%${searchText.toLocaleLowerCase().replace(' ', '%')}%`}`
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
export const getTicketSearchResults = async (searchText: string) => {
  try {
    const tickets = await db
      .select({
        id: ticketsTable.id,
        ticketDate: ticketsTable.createdAt,
        title: ticketsTable.title,
        firstName: customersTable.firstName,
        lastName: customersTable.lastName,
        email: customersTable.email,
        phone: customersTable.phone,
        tech: ticketsTable.tech,
        completed: ticketsTable.completed,
        updatedDate: ticketsTable.updatedAt,
      })
      .from(ticketsTable)
      .leftJoin(customersTable, eq(ticketsTable.customersId, customersTable.id))
      .where(
        or(
          ilike(ticketsTable.title, `%${searchText}%`),
          ilike(ticketsTable.tech, `%${searchText}%`),
          ilike(customersTable.email, `%${searchText}%`),
          ilike(customersTable.phone, `%${searchText}%`),
          ilike(customersTable.city, `%${searchText}%`),
          sql`lower(concat(${customersTable.firstName}, ' ', ${
            customersTable.lastName
          })) LIKE ${`%${searchText.toLocaleLowerCase().replace(' ', '%')}%`}`
        )
      )
      .orderBy(asc(ticketsTable.createdAt));
    return tickets;
    //ilike case insensitive search
  } catch (error) {
    console.log(error);
    captureSentryException({
      message: 'Error in getTicketSearchResults',
      title: 'Error in getTicketSearchResults',
    });
  }
};
export const getOpenTickets = async () => {
  try {
    const results = await db
      .select({
        id: ticketsTable.id,
        ticketDate: ticketsTable.createdAt,
        title: ticketsTable.title,
        firstName: customersTable.firstName,
        lastName: customersTable.lastName,
        email: customersTable.email,
        phone: customersTable.phone,
        tech: ticketsTable.tech,
        completed: ticketsTable.completed,
        updatedDate: ticketsTable.updatedAt,
      })
      .from(ticketsTable)
      .leftJoin(customersTable, eq(ticketsTable.customersId, customersTable.id))
      // .where(eq(ticketsTable.completed, false))
      .orderBy(asc(ticketsTable.createdAt));
    return results;
  } catch (error) {
    console.log(error);
    captureSentryException({
      message: 'Error in getOpenTickets',
      title: 'Error in getOpenTickets',
    });
  }
};

export type TicketSearchResultsType = Awaited<
  ReturnType<typeof getTicketSearchResults>
>;
