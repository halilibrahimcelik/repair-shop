import Image from 'next/image';
import { Button } from '../ui/button';
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';

const SocialLinks: React.FC = () => {
  return (
    <div className='w-full'>
      <div className='w-full flex items-center'>
        <span className=' block h-[1px] w-full mx-3 border-b '></span>
        <span className='paragraph'> OR</span>
        <span className=' block h-[1px] w-full mx-3 border-b '></span>
      </div>

      <div className='flex items-center justify-center gap-4'>
        <LoginLink
          authUrlParams={{
            connection_id: process.env.NEXT_PUBLIC_KINDE_CONNECTION_GOOGLE!,
          }}
        >
          <Button
            className='rounded-full w-12 h-12 p-2'
            type='button'
            variant={'ghost'}
            size={'icon'}
          >
            <Image
              src='/images/google.svg'
              alt='Google'
              width={40}
              height={40}
            />
          </Button>
        </LoginLink>
        <LoginLink
          authUrlParams={{
            connection_id: process.env.NEXT_PUBLIC_KINDE_CONNECTION_GITHUB!,
          }}
        >
          <Button
            className='rounded-full w-12 h-12 p-2'
            type='button'
            size={'icon'}
            variant={'ghost'}
          >
            <Image
              src='/images/github.svg'
              alt='Github'
              width={40}
              height={40}
            />
          </Button>
        </LoginLink>
      </div>
    </div>
  );
};

export default SocialLinks;
