import { Card } from '@/components/ui/card';
import EmailInput from '@/components/login/EmailInput';
import SocialLinks from '@/components/login/SocialLinks';

const LoginPage = () => {
  return (
    <main className='container mx-auto px-10 flex items-center justify-center py-20'>
      <Card className='w-fit  py-3 px-4  flex flex-col justify-center items-center gap-2 '>
        <h1 className='heading mb-3 line-clamp-3 leading-[60px]'>
          Computer Repair Shop <br />
          Peckham
        </h1>

        <EmailInput />
        <SocialLinks />
        {/* <Button className='text-xl font-bold' asChild>
          <LoginLink
          authUrlParams={{
            connection_id:NEXT_
          }}
          >Sign in</LoginLink>
        </Button> */}
      </Card>
    </main>
  );
};

export default LoginPage;
