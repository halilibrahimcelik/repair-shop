type Props = { children: React.ReactNode };
export default async function RSTemplate({ children }: Props) {
  return <div className='animate-appear'>{children}</div>;
}
