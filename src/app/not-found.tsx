import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Not Found',
  description: 'Page not found',
};
export default function NotFound() {
  return (
    <div className='mx-auto px-10 py-10 flex justify-center'>
      <Card className=' flex flex-col gap-4 justify-center items-center w- p-4 '>
        <h2 className='subheading'>Not Found</h2>
        <p className='paragraph'>Could not find requested resource</p>
        <Image
          src={'/images/not-found.png'}
          width={400}
          height={400}
          alt='Not Found'
          className='rounded-lg'
        />
        <Button asChild>
          <Link href='/'>Return Home</Link>
        </Button>
      </Card>
    </div>
  );
}
