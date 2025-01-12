import { NextPage } from 'next';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import RequestPermissionForm from '@/components/forms/RequestPermissionForm';

const UserPage: NextPage = async () => {
  /*
  This page will be updated in the future development
  It will be used to display the user profile and allow them to edit their profile
  */

  const { getUser, getPermission } = getKindeServerSession();
  const [user, role] = await Promise.all([getUser(), getPermission('manager')]);
  const isManager = role?.isGranted;

  return (
    <div className='my-4 flex flex-col md:flex-row  gap-2'>
      <div className='w-full'>
        <h1 className='subheading mb-2'>Welcome back {user?.given_name}</h1>
        <p>
          Here you can see ask permission for managing tickets, with your
          current permission, you are not allowed to edit or create a new ticket
        </p>
      </div>
      <div className='w-full'>
        {isManager ? (
          <p className='paragpraph'>You have full authorization</p>
        ) : (
          <RequestPermissionForm user={user} />
        )}
      </div>

      {/* <UserForm accessToken={accessToken} user={user} /> */}
    </div>
  );
};

export default UserPage;
