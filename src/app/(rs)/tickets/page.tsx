import SearchForm from '@/components/SearchForm';
import TicketTable from '@/components/table/TicketTable';
import { getTicketSearchResults, getOpenTickets } from '@/lib/queries';
import React from 'react';

export const metadata = {
  title: 'Ticket Search',
  description: 'Ticket Search',
};
type Props = {
  searchParams: Promise<{ searchText: string | undefined }>;
};

const TicketsPage = async ({ searchParams }: Props) => {
  const { searchText } = await searchParams;
  if (!searchText) {
    const tickets = await getOpenTickets();
    console.log(tickets?.length);
    return (
      <div>
        <SearchForm action='/tickets' />
      </div>
    );
  }
  const results = await getTicketSearchResults(searchText);
  return (
    <div>
      <SearchForm action='/tickets' searchText={searchText} />
      <h1>
        Ticket Search Results for: {searchText}
        <TicketTable data={results!} />
      </h1>
    </div>
  );
};

export default TicketsPage;
