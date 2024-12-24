'use client';

import { useFormStatus } from 'react-dom';
import { LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SearchButton: React.FC = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className='w-20' type='submit'>
      {pending ? (
        <>
          <LoaderCircle className='animate-spin' size={40} />
        </>
      ) : (
        'Search'
      )}
    </Button>
  );
};

export default SearchButton;
