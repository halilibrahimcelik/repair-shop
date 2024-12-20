export enum ROUTES {
  HOME = '/home',
  TICKETS = '/tickets',
  CUSTOMERS = '/customers',
  USER = '/user',
  NOT_FOUND = '/not-found',
  ADD_CUSTOMER = '/customers/form',
}

export type ErrorMessage = {
  message: string | Error;
  title: string;
};
