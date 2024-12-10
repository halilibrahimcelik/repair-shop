import Header from '@/components/Header';

type Props = { children: React.ReactNode };
export default async function RSLayout({ children }: Props) {
  return (
    <div className='container mx-auto px-4'>
      <Header />
      <section className='px-4 py-2'>{children}</section>
    </div>
  );
}
