import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { Button } from '@/components/ui/button';

const LoginPage = () => {
  return (
    <div>
      <Button asChild>
        <LoginLink>Sign in</LoginLink>
      </Button>
    </div>
  );
};

export default LoginPage;
