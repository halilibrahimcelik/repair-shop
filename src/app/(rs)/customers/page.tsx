import React from 'react';
import CustomerSearch from '@/components/CustomerSearch';
import { getCustomerSearchResults } from '@/lib/queries';
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
    return <CustomerSearch />;
  }
  const results = await getCustomerSearchResults(searchText);
  return (
    <div>
      <CustomerSearch searchText={searchText} />
      <h1>
        Customer Search Results for: {searchText}
        {JSON.stringify(results)}
      </h1>
    </div>
  );
};

export default CustomerPage;
