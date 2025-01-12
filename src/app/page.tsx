'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ROUTES } from '@/types/default';
import Link from 'next/link';

export default function Home() {
  return (
    <div className=' aspect-square object-cover bg-center bg-cover h-screen w-screen bg-home-img '>
      <main className='flex  items-center justify-center w-full h-full'>
        <Card className='p-6 flex flex-col gap-2'>
          <h1 className='heading my-4'>
            {' '}
            Peckham&apos;s <br /> Repair Shop{' '}
          </h1>
          <address className='text-xl'>
            555 London Peckham Rd. <br />
            <p>SE1 5EU</p>
          </address>
          <p className='text-xl'>
            Open Daily 9am to 9pm <br />
            <Link href='tel:55554443333' className='hover:underline'>
              5555 444 333
            </Link>
          </p>
          <div className='flex items-center justify-center w-full h-full'>
            <Link href={ROUTES.TICKETS} className='btn'>
              <Button variant='ghost' size='lg'>
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </Card>
      </main>
    </div>
  );
}
