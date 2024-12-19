import { NextPage } from 'next';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import UserForm from '@/components/forms/UserForm';

const UserPage: NextPage = async () => {
  const { getUser, getAccessTokenRaw } = getKindeServerSession();
  const [user, accessToken] = await Promise.all([
    getUser(),
    getAccessTokenRaw(),
  ]);

  return (
    <div className='my-4'>
      <h1>Welcome {user?.given_name}</h1>
      <p>Here you can see edit your Profile</p>
      <UserForm accessToken={accessToken} user={user} />
    </div>
  );
};

export default UserPage;
