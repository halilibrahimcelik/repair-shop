import { useQuery } from '@tanstack/react-query';
import { getOpenTickets, getTicketSearchResults } from './queries';
export function useGetSearchedTickets(param: string) {
  return useQuery({
    queryKey: ['searched-tickets'],
    queryFn: async () => {
      if (param) {
        return await getTicketSearchResults(param);
      } else {
        return [];
      }
    },
  });
}

export function useGetAllOpenTickets() {
  return useQuery({
    queryKey: ['open-tickets'],
    queryFn: async () => await getOpenTickets(),
  });
}
