'use client';

import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
type Props = {
  user: KindeUser<Record<string, unknown>>;
};
type UserFormProps = {
  email: string | null;
};
const RequestPermissionForm = ({ user }: Props) => {
  const formSchema = z.object({
    email: z.string().email(),
  });
  const form = useForm<UserFormProps>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: user.email || '',
    },
  });

  const requestPermission = async (e: UserFormProps) => {
    try {
      console.log(e.email);
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: e.email,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(form.formState.isSubmitting);
  return (
    <Form {...form}>
      <form className=' ' onSubmit={form.handleSubmit(requestPermission)}>
        <FormField
          name='email'
          render={({ field }) => (
            <FormItem className='max-w-md'>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-[180px] my-3'>
          {form.formState.isSubmitting ? (
            <LoaderCircle className='w-6 h-6  animate-spin' />
          ) : (
            'Request Permission'
          )}
        </Button>
      </form>
    </Form>
  );
};
export default RequestPermissionForm;
