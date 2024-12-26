import { LoaderCircle } from 'lucide-react';

const LoaderPage = () => {
  return (
    <div className='fixed insent-0 z-[1001] w-full top-0 left-0 right-0 bottom-0  bg-black/1  '>
      <div className='w-full h-dvh grid place-content-center'>
        <LoaderCircle size={100} className='animate-spin' />
      </div>
    </div>
  );
};
export default LoaderPage;
