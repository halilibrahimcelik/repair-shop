'use client';

import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

import { Input } from '../ui/input';

import { InputHTMLAttributes } from 'react';

type Props<S> = {
  fieldTitle: string;
  nameInSchema: keyof S & string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const InputWithLabel = <S,>({
  fieldTitle,
  nameInSchema,

  className,
  ...props
}: Props<S>) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={nameInSchema}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel className='text-base' htmlFor={nameInSchema}>
              {fieldTitle}
            </FormLabel>
            <FormControl>
              <Input
                id={nameInSchema}
                className={`w-full px-2 py-1 rounded-lg  disabled:text-blue-400
                     dark:disabled:text-gray-300-300 disabled:opacity-60 ${className}`}
                {...props}
                {...field}
              />
            </FormControl>
            <FormMessage withIcon={true} />
          </FormItem>
        );
      }}
    />
  );
};
export default InputWithLabel;
