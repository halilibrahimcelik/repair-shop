'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';

import { Button } from '@/components/ui/button';

import {
  SelectTicketSchemaType,
  InsertTicketSchemaType,
  insertTicketSchema,
} from '@/zod-schemas/tickets';
import InputWithLabel from '../inputs/InputWithLabel';
import TextAreaWithLabel from '../inputs/TextAreaWithLabel';
import SelectWithLabel from '../inputs/SelectWithLabel';
import { SelectCusctomerSchemaType } from '@/zod-schemas/customer';
import CheckboxWithLabel from '../inputs/CheckboxWithLabel';

type Props = {
  customer: SelectCusctomerSchemaType;
  ticket?: SelectTicketSchemaType;
};
const TicketsForm: React.FC<Props> = ({ ticket, customer }) => {
  const defaultValues: InsertTicketSchemaType = {
    customersId: customer.id ?? ticket?.customersId,
    id: ticket?.id || 'New',
    title: ticket?.title || '',
    description: ticket?.description || '',
    tech: ticket?.tech || 'new-ticket@example.com',
    completed: ticket?.completed || false,
  };

  const form = useForm<InsertTicketSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(insertTicketSchema),
    defaultValues,
  });
  const onSubmitHandler = async (data: InsertTicketSchemaType) => {
    console.log(data);
  };
  return (
    <div className='flex flex-col gap-3 sm:px-8'>
      <div>
        <h2 className='subheading'>
          {ticket?.id ? 'Edit' : 'New'} Ticket Form
        </h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitHandler)}
          className='flex flex-col md:flex-row  gap-4 w-full border p-2 rounded-lg'
        >
          <div className='flex flex-col gap-2 w-full'>
            <InputWithLabel<InsertTicketSchemaType>
              nameInSchema={'title'}
              fieldTitle='Title'
            />
            <InputWithLabel<InsertTicketSchemaType>
              nameInSchema={'tech'}
              fieldTitle='Tech'
              readOnly={true}
            />{' '}
            <CheckboxWithLabel<InsertTicketSchemaType>
              fieldTitle='Completed'
              message='Check if completed'
              nameInSchema='completed'
            />
            <div className='mt-4 space-y-2'>
              <h3 className='text-lg'>Customer Info</h3>
              <hr className='w-3/4' />
              <p>
                {customer.firstName} {customer.lastName}{' '}
              </p>
              <address>{customer.address1} </address>
              {customer?.address2 && <address>{customer.address2}</address>}
              <p>
                {' '}
                {customer.city} | {customer.state} | {customer?.postCode}{' '}
              </p>
              <hr className='w-3/4' />
              <p> {customer.phone} </p>
              <p> {customer.email} </p>
            </div>
          </div>

          <div className='flex flex-col gap-2 w-full'>
            <TextAreaWithLabel<InsertTicketSchemaType>
              nameInSchema='description'
              fieldTitle='Description'
              className='h-64'
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

export default TicketsForm;
