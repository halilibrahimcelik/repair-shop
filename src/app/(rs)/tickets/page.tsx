import SearchForm from '@/components/SearchForm';
import TicketTable from '@/components/table/TicketTable';
import { getTicketSearchResults, getOpenTickets } from '@/lib/queries';
import React from 'react';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
export const metadata = {
  title: 'Ticket Search',
  description: 'Ticket Search',
};
type Props = {
  searchParams: Promise<{ searchText: string | undefined }>;
};

const TicketsPage = async ({ searchParams }: Props) => {
  const { searchText } = await searchParams;
  const queryClient = new QueryClient();
  if (!searchText) {
    // const tickets = await getOpenTickets();
    await queryClient.prefetchQuery({
      queryKey: ['open-tickets'],
      queryFn: async () => await getOpenTickets(),
    });
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SearchForm action='/tickets' />
        <TicketTable isOpenTickets />
      </HydrationBoundary>
    );
  } else {
    await queryClient.prefetchQuery({
      queryKey: ['searched-tickets'],
      queryFn: async () => await getTicketSearchResults(searchText),
    });
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div>
          <SearchForm action='/tickets' searchText={searchText} />
          <h1>Ticket Search Results for: {searchText}</h1>
          <TicketTable searchText={searchText} />
        </div>
      </HydrationBoundary>
    );
  }
};

export default TicketsPage;
