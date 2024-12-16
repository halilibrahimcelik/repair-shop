'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';

import { Button } from '@/components/ui/button';

import {
  type InsertCustomerSchemaType,
  insertCustomerSchema,
  type SelectCusctomerSchemaType,
  selectCustomerSchema,
} from '@/zod-schemas/customer';

type Props = {
  customer?: SelectCusctomerSchemaType;
};
const CustomerForm: React.FC<Props> = ({ customer }) => {
  const defaultValues: InsertCustomerSchemaType = {
    id: customer?.id || 0,
    firstName: customer?.firstName || '',
    lastName: customer?.lastName || '',
    address1: customer?.address1 || '',
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
    <div className='flex flex-col gap-2 sm:px-8'>
      <div>
        <h2 className='subheading'>{customer?.id ? 'Edit' : 'New'} Customer</h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex border p-2 rounded-lg'
        >
          <p>{JSON.stringify(form.getValues())}</p>
        </form>
      </Form>
    </div>
  );
};

export default CustomerForm;
