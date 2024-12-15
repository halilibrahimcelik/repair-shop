import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { getCustomer } from '..';
import fetchMock from 'jest-fetch-mock';

jest.mock('../index');
beforeEach(() => {
  fetchMock.resetMocks();
});

describe('check getCustomer function', () => {
  it('should return customer with ID#1', async () => {
    expect.assertions(1);
    const data = await getCustomer(1);
    expect(data?.firstName).toBe('John');
  });
});
