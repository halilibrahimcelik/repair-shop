'use client';

import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types';
import { Button } from '../ui/button';
import Form from 'next/form';

type Props = {
  user: KindeUser<Record<string, unknown>>;
};
const RequestPermissionForm = ({ user }: Props) => {
  console.log(user);
  const requestPermission = async () => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'hallocanno@gmail.com',
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return <Form action={''}></Form>;
};
export default RequestPermissionForm;
