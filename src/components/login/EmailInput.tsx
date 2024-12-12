'use client';
import { useRef, useState } from 'react';
import { Button } from '../ui/button';
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const EmailInput: React.FC = () => {
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(false);
  const submitRef = useRef<HTMLButtonElement>(null);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    if (e.target.value === '') {
      setDisabled(true);
    }

    if (!emailRegex.test(e.target.value)) {
      setDisabled(true);
    }
    if (e.target.value !== '' && emailRegex.test(e.target.value)) {
      setDisabled(false);
      submitRef.current?.focus();
    }
  };
  return (
    <div className='w-full flex-col  md:flex-row md:flex  md:justify-center items-center gap-2 '>
      <div className='flex gap-2  items-center w-full'>
        <input
          value={email}
          onChange={handleEmailChange}
          placeholder='Email'
          className='border rounded-md p-2  block w-full'
          type='email'
          id='email'
          name='email'
        />
      </div>
      <LoginLink
        className={disabled ? 'cursor-not-allowed pointer-events-none' : ''}
        authUrlParams={{
          connection_id: process.env.NEXT_PUBLIC_KINDE_CONNECTION_PASSWORDLESS!,
          login_hint: email,
        }}
      >
        <Button
          ref={submitRef}
          disabled={disabled}
          type='button'
          variant={'default'}
        >
          Continue
        </Button>
      </LoginLink>
    </div>
  );
};
export default EmailInput;
