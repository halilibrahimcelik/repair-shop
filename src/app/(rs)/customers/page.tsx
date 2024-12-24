import React from 'react';
import { getAllCustomers, getCustomerSearchResults } from '@/lib/queries';
import SearchForm from '@/components/SearchForm';
import CustomerTable from '@/components/table/CustomerTable';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
type Props = {
  searchParams: Promise<{
    searchText: string | undefined;
    allCustomers: string | undefined;
  }>;
};
export const metadata = {
  title: 'Customer Search',
  description: 'Customer Search',
};
const CustomerPage = async ({ searchParams }: Props) => {
  const { searchText, allCustomers } = await searchParams;
  const queryClient = new QueryClient();

  if (!searchText) {
    // const allCusomerList = await getAllCustomers();
    console.log('heey');
    await queryClient.prefetchQuery({
      queryKey: ['get-all-customers'],
      queryFn: async () => await getAllCustomers(),
    });
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SearchForm action='/customers' />
        {(allCustomers === 'true' || searchText === '') && (
          <CustomerTable isAllCustomers />
        )}
      </HydrationBoundary>
    );
  } else {
    await queryClient.prefetchQuery({
      queryKey: ['searched-customers'],
      queryFn: async () => await getCustomerSearchResults(searchText),
    });
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SearchForm action='/customers' searchText={searchText} />
        <h1>
          Customer Search Results for: {searchText}
          <CustomerTable searchText={searchText} />
        </h1>
      </HydrationBoundary>
    );
  }
};

export default CustomerPage;
