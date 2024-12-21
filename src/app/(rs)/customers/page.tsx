import React from 'react';
import { getCustomerSearchResults } from '@/lib/queries';
import SearchForm from '@/components/SearchForm';
import CustomerTable from '@/components/table/CustomerTable';
type Props = {
  searchParams: Promise<{ searchText: string | undefined }>;
};
export const metadata = {
  title: 'Customer Search',
  description: 'Customer Search',
};
const CustomerPage = async ({ searchParams }: Props) => {
  const { searchText } = await searchParams;

  if (!searchText) {
    return <SearchForm action='/customers' />;
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
