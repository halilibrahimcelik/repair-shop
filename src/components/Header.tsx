import React from 'react';
import { HomeIcon, File, UsersRound } from 'lucide-react';
import NavButton from './NavButton';
import Link from 'next/link';
import { ROUTES } from '@/types/default';

const Header = () => {
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
          <NavButton label='Tickets' Icon={File} href={ROUTES.TICKETS} />
          <NavButton
            label='customer'
            Icon={UsersRound}
            href={ROUTES.CUSTOMERS}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
