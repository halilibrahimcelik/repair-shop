'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types';
import { Button } from '../ui/button';

type Props = {
  accessToken: string;
  user: KindeUser<Record<string, any>>;
};
type UserFormProps = {
  email?: string | null;
  given_name?: string | null;
  family_name?: string | null;
  username?: string | null;
  phone_number?: string | null;
};
const UserForm: React.FC<Props> = ({ user, accessToken }) => {
  //   const updateUser = async (data: UserFormProps) => {
  //     try {
  //       fetch(
  //         `${process.env.NEXT_PUBLIC_KINDE_DOMAIN}/api/v1/user?id=${user.id}`,
  //         {
  //           method: 'PATCH',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //           body: JSON.stringify({
  //             data,
  //           }),
  //         }
  //       );
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         console.error(error.message);
  //       }
  //     }
  //   };

  const updateUser = async (data: UserFormProps) => {
    try {
      const response = await fetch('/api/user/patch', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          data,
          accessToken,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };
  return (
    <>
      <Button
        onClick={async () => {
          try {
            const res = await updateUser({
              given_name: 'John',
              family_name: 'Doe',
            });
            console.log(res);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Update
      </Button>
    </>
  );
};

export default UserForm;
