'use client';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

type Props = {
  variants:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  title: string;
} & React.HTMLAttributes<HTMLButtonElement>;
export const BackButton: React.FC<Props> = ({
  size = 'default',
  className,
  title,
  variants,
}) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      title={title}
      className={className}
      size={size}
      variant={variants}
    >
      {title}
    </Button>
  );
};
