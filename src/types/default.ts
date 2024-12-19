export enum ROUTES {
  HOME = '/home',
  TICKETS = '/tickets',
  CUSTOMERS = '/customers',
  USER = '/user',
  NOT_FOUND = '/not-found',
}

export type ErrorMessage = {
  message: string | Error;
  title: string;
};
