'use client';

import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

import { SelectHTMLAttributes } from 'react';

type Props<S> = {
  fieldTitle: string;
  data: { id: string; name: string }[];
  nameInSchema: keyof S & string;
  className?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

const SelectWithLabel = <S,>({
  fieldTitle,
  nameInSchema,
  className,
  data,
}: Props<S>) => {
  const onlyObjWithName = data.filter((item) => item.name);
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={nameInSchema}
      render={({ field }) => {
        return (
          <FormItem key={nameInSchema}>
            <FormLabel className='text-base mb-2' htmlFor={nameInSchema}>
              {fieldTitle}
            </FormLabel>
            <Select
              {...field}
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger
                  id={nameInSchema}
                  className={`w-full  ${className}`}
                >
                  <SelectValue placeholder='Select a State' />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {onlyObjWithName.map(({ id, name }) => {
                  return (
                    <SelectItem key={id} value={name}>
                      {' '}
                      {name}{' '}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <FormMessage withIcon />
          </FormItem>
        );
      }}
    />
  );
};
export default SelectWithLabel;
