import { BackButton } from '@/components/BackButton';
import CustomerForm from '@/components/forms/CustomerForm';
import { getCustomer } from '@/lib/queries';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Metadata } from 'next';

type Props = {
  searchParams: Promise<{
    customerId: string | undefined;
  }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  // read route params
  const { customerId } = await searchParams;
  const customer = await getCustomer(parseInt(customerId!));
  if (customerId) {
    return {
      title: `Edit Customer ${customer?.firstName}`,
      description: `Edit Customer  ${customer?.firstName} | ${customer?.lastName}`,
    };
  } else {
    return {
      title: `New Customer`,
      description: `New Customer`,
    };
  }
}

const CustomerFormPage: React.FC<Props> = async ({ searchParams }) => {
  const { getPermission } = getKindeServerSession();
  const managerPermission = await getPermission('manager');
  const isManager = managerPermission?.isGranted;
  try {
    const { customerId } = await searchParams;
    const isNewCustomer = customerId ? false : true;
    if (customerId) {
      //editForm

      const customer = await getCustomer(parseInt(customerId));
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
          <CustomerForm
            isNewCustomer={isNewCustomer}
            customer={customer}
            isGranted={isManager!}
          />
        </div>
      );
    } else {
      //new customer form component

      return (
        <div>
          <h1>New customer form</h1>
          <CustomerForm isNewCustomer={isNewCustomer} isGranted={isManager!} />
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
