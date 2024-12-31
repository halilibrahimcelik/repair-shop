import { NextPage } from 'next';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import UserForm from '@/components/forms/UserForm';
import { redirect } from 'next/navigation';

const UserPage: NextPage = async () => {
  /*
  This page will be updated in the future development
  It will be used to display the user profile and allow them to edit their profile
  */
  redirect('/tickets');
  const { getUser, getAccessTokenRaw } = getKindeServerSession();
  const [user, accessToken] = await Promise.all([
    getUser(),
    getAccessTokenRaw(),
  ]);

  return (
    <div className='my-4'>
      <h1>Welcome back {user?.given_name}</h1>
      <p>Here you can see edit your Profile</p>
      <UserForm accessToken={accessToken} user={user} />
    </div>
  );
};

export default UserPage;
