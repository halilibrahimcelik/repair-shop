import Header from '@/components/Header';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
type Props = { children: React.ReactNode };
export default async function RSLayout({ children }: Props) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className='container mx-auto px-4'>
      <Header user={user} />
      <section className='px-4 py-2'>{children}</section>
    </div>
  );
}
