type Props = { children: React.ReactNode };
export default async function RSTemplate({ children }: Props) {
  return <div className='my-4 animate-appear'>{children}</div>;
}
