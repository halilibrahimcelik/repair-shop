'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';

import { Button } from '@/components/ui/button';

import {
  type InsertCustomerSchemaType,
  insertCustomerSchema,
  type SelectCusctomerSchemaType,
} from '@/zod-schemas/customer';
import InputWithLabel from '../inputs/InputWithLabel';
import TextAreaWithLabel from '../inputs/TextAreaWithLabel';
import SelectWithLabel from '../inputs/SelectWithLabel';
import { CITIES } from '@/constants/cities';

type Props = {
  customer?: SelectCusctomerSchemaType;
};
const CustomerForm: React.FC<Props> = ({ customer }) => {
  const defaultValues: InsertCustomerSchemaType = {
    id: customer?.id || 0,
    firstName: customer?.firstName || '',
    lastName: customer?.lastName || '',
    address1: customer?.address1 || '',
    address2: customer?.address2 || '',
    city: customer?.city || '',
    email: customer?.email || '',
    phone: customer?.phone || '',
    notes: customer?.notes || '',
    postCode: customer?.postCode || '',
    state: customer?.state || '',
  };
  const form = useForm<InsertCustomerSchemaType>({
    mode: 'onBlur',
    defaultValues,
    resolver: zodResolver(insertCustomerSchema),
  });

  const onSubmit = async (data: InsertCustomerSchemaType) => {
    console.log(data);
  };
  return (
    <div className='flex flex-col gap-2 sm:px-8 max-w-sm md:max-w-xl w-full mx-auto'>
      <div>
        <h2 className='subheading'>{customer?.id ? 'Edit' : 'New'} Customer</h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col md:flex-row  gap-4 w-full border p-2 rounded-lg'
        >
          <div className='flex flex-col gap-2 w-full'>
            <InputWithLabel<InsertCustomerSchemaType>
              nameInSchema={'firstName'}
              fieldTitle='First Name'
            />
            <InputWithLabel<InsertCustomerSchemaType>
              nameInSchema={'lastName'}
              fieldTitle='Last Name'
            />
            <TextAreaWithLabel<InsertCustomerSchemaType>
              nameInSchema={'address1'}
              fieldTitle='Address 1'
            />
            <InputWithLabel<InsertCustomerSchemaType>
              nameInSchema={'address2'}
              fieldTitle='Address 2'
            />
            <InputWithLabel<InsertCustomerSchemaType>
              nameInSchema={'city'}
              fieldTitle='City'
            />
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <InputWithLabel<InsertCustomerSchemaType>
              nameInSchema={'phone'}
              fieldTitle='Phone'
            />
            <InputWithLabel<InsertCustomerSchemaType>
              nameInSchema={'email'}
              fieldTitle='Email'
            />
            <InputWithLabel<InsertCustomerSchemaType>
              nameInSchema={'postCode'}
              fieldTitle='Post Code'
            />
            <SelectWithLabel<InsertCustomerSchemaType>
              nameInSchema={'state'}
              fieldTitle='State'
              data={CITIES}
            />
            <TextAreaWithLabel<InsertCustomerSchemaType>
              nameInSchema={'notes'}
              fieldTitle='Notes'
            />
            <div className='flex gap-2 my-2'>
              <Button title='Save' className='w-3/4' type='submit'>
                Save
              </Button>
              <Button
                onClick={() => {
                  form.reset(defaultValues);
                }}
                className='w-1/4'
                variant={'destructive'}
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CustomerForm;
