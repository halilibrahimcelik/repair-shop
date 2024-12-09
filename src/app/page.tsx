import Link from 'next/link';

export default function Home() {
  return (
    <div className=' aspect-square object-cover bg-center bg-cover h-screen w-screen bg-home-img '>
      <main className='flex items-center justify-center w-full h-full'>
        <div>
          <h1>
            {' '}
            Halil&apos;s <br /> Repair Shop{' '}
          </h1>
          <address>
            555 London Peckham Rd. <br />
            <p>SE1 5EU</p>
          </address>
          <p>
            Open Daily 9am to 9pm
            <Link href='tel:5555555555' className='hover:underline'>
              5555555555
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
