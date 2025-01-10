'use client';

import { Button } from '../ui/button';

const RequestPermissionForm = () => {
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
  return (
    <Button onClick={requestPermission} className='w-fit'>
      Ask for permission
    </Button>
  );
};
export default RequestPermissionForm;
