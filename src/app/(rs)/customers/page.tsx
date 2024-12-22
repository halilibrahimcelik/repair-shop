import React from 'react';
import { getAllCustomers, getCustomerSearchResults } from '@/lib/queries';
import SearchForm from '@/components/SearchForm';
import CustomerTable from '@/components/table/CustomerTable';
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

  if (!searchText) {
    const allCusomerList = await getAllCustomers();

    return (
      <>
        <SearchForm action='/customers' />
        {(allCustomers === 'true' || searchText === '') && (
          <CustomerTable data={allCusomerList!} />
        )}
      </>
    );
  }
  const results = await getCustomerSearchResults(searchText);
  return (
    <div>
      <SearchForm action='/customers' searchText={searchText} />
      <h1>
        Customer Search Results for: {searchText}
        <CustomerTable data={results!} />
      </h1>
    </div>
  );
};

export default CustomerPage;
