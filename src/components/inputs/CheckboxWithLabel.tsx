'use client';

import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

import { Checkbox } from '../ui/checkbox';

type Props<S> = {
  fieldTitle: string;
  nameInSchema: keyof S & string;
  message: string;
  disabled?: boolean;
};

const CheckboxWithLabel = <S,>({
  fieldTitle,
  nameInSchema,
  message,
  disabled = false,
}: Props<S>) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={nameInSchema}
      render={({ field }) => {
        return (
          <FormItem className='w-full flex flex-row items-center gap-2'>
            <FormLabel className='text-base w-1/3 mt-2 ' htmlFor={nameInSchema}>
              {fieldTitle}
            </FormLabel>
            <div className='flex items-center gap-2 '>
              <FormControl>
                <Checkbox
                  disabled={disabled}
                  checked={field.value}
                  id={nameInSchema}
                  onCheckedChange={field.onChange}
                  {...field}
                />
              </FormControl>
              {message}
            </div>
            <FormMessage withIcon={true} />
          </FormItem>
        );
      }}
    />
  );
};
export default CheckboxWithLabel;
