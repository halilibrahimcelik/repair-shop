'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';

import { Button } from '@/components/ui/button';

import {
  SelectTicketSchemaType,
  InsertTicketSchemaType,
  selectTicketSchema,
  insertTicketSchema,
} from '@/zod-schemas/tickets';
import { SelectCusctomerSchemaType } from '@/zod-schemas/customer';

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
          className='flex border p-2 rounded-lg'
        >
          <p>{JSON.stringify(form.getValues())}</p>
        </form>
      </Form>
    </div>
  );
};

export default TicketsForm;
