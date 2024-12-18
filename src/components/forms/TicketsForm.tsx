'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { User, MapPin, Phone, Mail } from 'lucide-react';

import {
  SelectTicketSchemaType,
  InsertTicketSchemaType,
  insertTicketSchema,
} from '@/zod-schemas/tickets';
import { SelectCusctomerSchemaType } from '@/zod-schemas/customer';
import InputWithLabel from '../inputs/InputWithLabel';
import TextAreaWithLabel from '../inputs/TextAreaWithLabel';
import CheckboxWithLabel from '../inputs/CheckboxWithLabel';
import SelectWithLabel from '../inputs/SelectWithLabel';

type Props = {
  customer: SelectCusctomerSchemaType;
  ticket?: SelectTicketSchemaType;
  techs?: {
    id: string;
    name: string;
  }[];
  isEditable?: boolean;
};

const TicketsForm: React.FC<Props> = ({
  ticket,
  customer,
  techs,
  isEditable = true,
}) => {
  const isManager = Array.isArray(techs);
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
    <Card className='w-full max-w-4xl mx-auto'>
      <CardHeader className='text-2xl'>
        <CardTitle>{ticket?.id ? 'Edit' : 'New'} Ticket Form</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitHandler)}>
          <CardContent className='grid gap-6 sm:grid-cols-2'>
            <div className='space-y-4'>
              <InputWithLabel<InsertTicketSchemaType>
                nameInSchema={'title'}
                fieldTitle='Title'
                disabled={!isEditable}
              />
              {isManager ? (
                <SelectWithLabel<InsertTicketSchemaType>
                  nameInSchema='tech'
                  fieldTitle='Tech ID'
                  data={[
                    {
                      id: 'new-ticket@example.com',
                      name: 'new-ticket@example.com',
                    },
                    ...techs,
                  ]}
                />
              ) : (
                <InputWithLabel<InsertTicketSchemaType>
                  nameInSchema={'tech'}
                  fieldTitle='Tech ID'
                  disabled={true}
                />
              )}
              {ticket?.id ? (
                <CheckboxWithLabel<InsertTicketSchemaType>
                  fieldTitle='Completed'
                  message='Check if completed'
                  nameInSchema='completed'
                  disabled={!isEditable}
                />
              ) : null}
              <Accordion
                type='single'
                defaultValue='customer-info'
                collapsible
                className='w-full'
              >
                <AccordionItem value='customer-info'>
                  <AccordionTrigger>Customer Info</AccordionTrigger>
                  <AccordionContent>
                    <div className='space-y-2'>
                      <div className='flex items-center space-x-2'>
                        <User className='h-4 w-4' />
                        <span>
                          {customer.firstName} {customer.lastName}
                        </span>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <MapPin className='h-4 w-4' />
                        <address>
                          {customer.address1}
                          {customer.address2 && <>, {customer.address2}</>}
                          <br />
                          {customer.city}, {customer.state} {customer.postCode}
                        </address>
                      </div>
                      <Separator />
                      <div className='flex items-center space-x-2'>
                        <Phone className='h-4 w-4' />
                        <span>{customer.phone}</span>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Mail className='h-4 w-4' />
                        <span>{customer.email}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className='space-y-4'>
              <TextAreaWithLabel<InsertTicketSchemaType>
                nameInSchema='description'
                fieldTitle='Description'
                className='h-64'
                disabled={!isEditable}
              />
            </div>
          </CardContent>
          <CardFooter className='flex justify-between'>
            <Button
              className='px-8'
              type='button'
              variant='destructive'
              disabled={!isEditable}
              onClick={() => form.reset(defaultValues)}
            >
              Reset
            </Button>
            <Button disabled={!isEditable} className='px-8' type='submit'>
              Save
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default TicketsForm;
