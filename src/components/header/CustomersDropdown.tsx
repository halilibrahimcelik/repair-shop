'use client';

import * as React from 'react';
import { UsersRound } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { ROUTES } from '@/types/default';

function CustomersDropdown() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <DropdownMenu onOpenChange={setIsOpen} open={isOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          title='Customers Menu'
          className='rounded-full p-2'
          variant='ghost'
          size={'icon'}
        >
          <UsersRound size={28} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-auto'>
        <DropdownMenuItem asChild onClick={() => setIsOpen(false)}>
          <Link href={ROUTES.CUSTOMERS + '?allCustomers=true'}>Customers</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild onClick={() => setIsOpen(false)}>
          <Link className='w-full ' href={ROUTES.ADD_CUSTOMER}>
            New Customer
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default CustomersDropdown;
