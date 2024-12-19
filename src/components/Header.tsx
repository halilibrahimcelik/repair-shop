'use client';
import React from 'react';
import { HomeIcon, File, UsersRound, LogOut } from 'lucide-react';
import NavButton from './NavButton';
import Link from 'next/link';
import { ROUTES } from '@/types/default';
import DarkModeSwitch from './DarkModeSwitch';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: KindeUser<Record<string, any>>;
};
const Header = ({ user }: Props) => {
  return (
    <header
      className='animate-up bg-background h-16 py-4 px-2 border-b 
  sticky top-0 z-1000 
  '
    >
      <div className='flex h-8 items-center justify-between w-full'>
        <div className='flex items-center gap-2'>
          <NavButton label='Home' Icon={HomeIcon} href='/' />
          <Link
            href={ROUTES.HOME}
            className='flex justify-center items-center gap-2 ml-0'
            title='Home'
          >
            <h1 className='hidden lg:block lg:subheading'>
              Computer Repair Shop
            </h1>
          </Link>
        </div>

        <div className='flex items-center gap-1'>
          <Button title='profile' className='p-0 h-auto  rounded-full'>
            <Link href={ROUTES.USER}>
              <Avatar>
                <AvatarImage src={user?.picture || ''} />
                <AvatarFallback>
                  {`${user?.given_name?.charAt(0)} ${user?.family_name?.charAt(
                    0
                  )}`}{' '}
                </AvatarFallback>
              </Avatar>
            </Link>
          </Button>

          <NavButton label='Tickets' Icon={File} href={ROUTES.TICKETS} />
          <NavButton
            label='customer'
            Icon={UsersRound}
            href={ROUTES.CUSTOMERS}
          />
          <DarkModeSwitch />
          <Button
            variant='ghost'
            aria-label='logout'
            title='logout'
            className='rounded-full'
            size={'icon'}
            asChild
          >
            <LogoutLink>
              <LogOut />
            </LogoutLink>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
