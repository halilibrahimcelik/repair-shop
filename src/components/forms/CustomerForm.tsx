'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import {
  type InsertCustomerSchemaType,
  insertCustomerSchema,
  type SelectCusctomerSchemaType,
} from '@/zod-schemas/customer';
import InputWithLabel from '../inputs/InputWithLabel';
import TextAreaWithLabel from '../inputs/TextAreaWithLabel';
import SelectWithLabel from '../inputs/SelectWithLabel';
import CheckboxWithLabel from '../inputs/CheckboxWithLabel';
import { useAction } from 'next-safe-action/hooks';
import { saveCustomerAction } from '@/app/actions/saveCustomerAction';
import { CITIES } from '@/constants/cities';
import { LoaderCircle } from 'lucide-react';
type Props = {
  customer?: SelectCusctomerSchemaType;
  isGranted: boolean;
};
const CustomerForm: React.FC<Props> = ({ customer, isGranted }) => {
  const defaultValues: InsertCustomerSchemaType = {
    id: customer?.id || 0,
    firstName: customer?.firstName || '',
    lastName: customer?.lastName || '',
    address1: customer?.address1 || '',
    address2: customer?.address2 || '',
    city: customer?.city || '',
    email: customer?.email || '',
    phone: customer?.phone || '',
    active: customer?.active || true,
    notes: customer?.notes || '',
    postCode: customer?.postCode || '',
    state: customer?.state || '',
  };
  const form = useForm<InsertCustomerSchemaType>({
    mode: 'onBlur',
    defaultValues,
    resolver: zodResolver(insertCustomerSchema),
  });
  const {
    execute: executeSave,
    // result: saveResult,
    reset: resetSaveAction,
    isPending: isSaving,
  } = useAction(saveCustomerAction, {
    onSuccess({ data }) {
      //use toast
      if (data?.message) {
        toast.success('Customer Saved Succesfully!', {
          description: data?.message,
          className: 'flex items-center w-full ',
          closeButton: true,
          classNames: {
            closeButton: 'toast-close-btn',
          },
          cancel: (
            <Button
              onClick={() => toast.dismiss()}
              className='absolute bottom-1 right-1'
              size={'sm'}
              variant={'ghost'}
            >
              Dismiss
            </Button>
          ),

          richColors: true,
        });
      }
    },
    onError({ error }) {
      toast.error('Error Found', {
        description: error?.serverError,
        className: 'flex items-center w-full ',
        closeButton: true,
        classNames: {
          closeButton: 'toast-close-btn',
        },
        cancel: (
          <Button
            onClick={() => toast.dismiss()}
            className='absolute bottom-1 right-1'
            size={'sm'}
            variant={'ghost'}
          >
            Dismiss
          </Button>
        ),

        richColors: true,
      });
    },
  });
  const onSubmit = async (data: InsertCustomerSchemaType) => {
    executeSave(data);
  };
  return (
    <Card className='w-full max-w-4xl mx-auto'>
      {/* <DisplayServerActionResponse result={saveResult} /> */}
      <CardHeader>
        <CardTitle>{customer?.id ? 'Edit' : 'New'} Customer Form</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className='grid gap-6 sm:grid-cols-2 r--'>
            <div className='space-y-4'>
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
            <div className='space-y-4'>
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
              {isGranted && customer?.id ? (
                <CheckboxWithLabel<InsertCustomerSchemaType>
                  fieldTitle='Active'
                  message='Check if active'
                  nameInSchema='active'
                />
              ) : null}
            </div>
          </CardContent>
          <CardFooter className='flex justify-between'>
            <Button
              onClick={() => {
                form.reset(defaultValues);
                resetSaveAction();
              }}
              className='px-8'
              variant={'destructive'}
            >
              Reset
            </Button>
            <Button
              title='Save'
              disabled={isSaving}
              className='px-8'
              type='submit'
            >
              {isSaving ? (
                <LoaderCircle className='w-6 h-6  animate-spin' />
              ) : (
                'Save'
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default CustomerForm;
