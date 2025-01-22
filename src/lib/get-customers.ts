import { useQuery } from '@tanstack/react-query';
import { getAllCustomers, getCustomerSearchResults } from './queries';
export function useGetSearchedCustomers(param: string) {
  return useQuery({
    queryKey: ['searched-customers'],
    queryFn: async () => {
      if (param) {
        return await getCustomerSearchResults(param);
      } else {
        return [];
      }
    },
  });
}

export function useGetAllCustomers() {
  return useQuery({
    queryKey: ['get-all-customers'],
    queryFn: async () => {
      return (await getAllCustomers()) || [];
    },
  });
}
