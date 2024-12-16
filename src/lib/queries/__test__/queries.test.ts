import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { getCustomer } from '..';
import fetchMock from 'jest-fetch-mock';

jest.mock('../index');
beforeEach(() => {
  fetchMock.resetMocks();
});

describe('queries for database', () => {
  it('should return customer with ID#1 via getCustomer', async () => {
    expect.assertions(1);
    const data = await getCustomer(1);
    expect(data?.firstName).toBe('John');
  });
  it('should return null when there is no customer on the table via getCustomer', async () => {
    expect.assertions(1);

    const data = await getCustomer(1231);
    expect(data).toBeNull();
  });
  it('should captureError', async () => {
    try {
      await getCustomer(323);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe(error);
      }
    }
  });
});
