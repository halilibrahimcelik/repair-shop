import { BackButton } from '@/components/BackButton';
import CustomerForm from '@/components/forms/CustomerForm';
import { getCustomer } from '@/lib/queries';

type Props = {
  searchParams: Promise<{
    customerId: string | undefined;
  }>;
};
const CustomerFormPage: React.FC<Props> = async ({ searchParams }) => {
  try {
    const { customerId } = await searchParams;

    if (customerId) {
      //editForm

      const customer = await getCustomer(parseInt(customerId));
      console.log(customer);
      if (!customer) {
        return (
          <div>
            <h2>Customer ID# {customerId} not found </h2>
            <BackButton title='Back' size='default' variants='default' />
          </div>
        );
      }
      //put customer form here
      return (
        <div>
          <h1>Edit customer form for customer id# {customerId} </h1>
          <CustomerForm customer={customer} />
        </div>
      );
    } else {
      //new customer form component

      return (
        <div>
          <h1>New customer form</h1>
          <CustomerForm />
        </div>
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export default CustomerFormPage;
