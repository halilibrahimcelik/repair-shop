'use client';

import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

import { Textarea } from '../ui/textarea';

import { TextareaHTMLAttributes } from 'react';

type Props<S> = {
  fieldTitle: string;
  nameInSchema: keyof S & string;
  className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextAreaWithLabel = <S,>({
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
            <FormLabel className='text-base mb-2' htmlFor={nameInSchema}>
              {fieldTitle}
            </FormLabel>
            <FormControl>
              <Textarea
                id={nameInSchema}
                className={`w-full px-2 py-1 rounded-lg  disabled:text-blue-400
                       dark:disabled:text-green-300 disabled:opacity-60 ${className}`}
                {...props}
                {...field}
              />
            </FormControl>
            <FormMessage withIcon />
          </FormItem>
        );
      }}
    />
  );
};
export default TextAreaWithLabel;
