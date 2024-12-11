export enum ROUTES {
  HOME = '/home',
  TICKETS = '/tickets',
  CUSTOMERS = '/customers',
  NOT_FOUND = '/not-found',
}

export type ErrorMessage = {
  message: string | Error;
  title: string;
};
