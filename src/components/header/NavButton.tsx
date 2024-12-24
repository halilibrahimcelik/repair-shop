import React from 'react';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
type Props = {
  Icon: LucideIcon;
  label: string;
  href?: string;
};

const NavButton = ({ label, Icon, href }: Props) => {
  return (
    <Button
      variant={'ghost'}
      title={label}
      size='icon'
      aria-label={label}
      className='rounded-full'
      asChild
    >
      {href ? (
        <Link href={href}>
          {' '}
          <Icon size={28} />{' '}
        </Link>
      ) : (
        <Icon size={28} />
      )}
    </Button>
  );
};

export default NavButton;
