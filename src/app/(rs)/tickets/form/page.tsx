import { BackButton } from '@/components/BackButton';
import TicketsForm from '@/components/forms/TicketsForm';
import { getTicket, getCustomer } from '@/lib/queries';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Users, init as kindeInit } from '@kinde/management-api-js';
export async function generateMetaData({
  searchParams,
}: {
  searchParams: Promise<{
    ticketId: string | undefined;
    customerId: string | undefined;
  }>;
}) {
  try {
    const { ticketId, customerId } = await searchParams;
    if (!ticketId && !customerId) {
      return {
        title: 'Missin Ticket ID and customer ID',
        description: 'Missin Ticket ID and customer ID',
      };
    }
    if (customerId) {
      return {
        title: `New Ticket Form for Customer ID# ${customerId}`,
        description: `New Ticket Form for Customer ID# ${customerId}`,
      };
    }
    if (ticketId) {
      return {
        title: `Edit Ticket Form for Ticket ID# ${ticketId}`,
        description: `Edit Ticket Form for Ticket ID# ${ticketId}`,
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}
type Props = {
  searchParams: Promise<{
    ticketId: string | undefined;
    customerId: string | undefined;
  }>;
};
const TicketFormPage: React.FC<Props> = async ({ searchParams }) => {
  const { getPermission, getUser } = getKindeServerSession();
  const [managerPermission, user] = await Promise.all([
    getPermission('manager'),
    getUser(),
  ]);
  const isManager = managerPermission?.isGranted;
  try {
    const { ticketId, customerId } = await searchParams;
    if (!ticketId && !customerId) {
      return (
        <div>
          <h2>Ticket ID and customer ID are required to load ticket form </h2>
          <BackButton title='Back' size='default' variants='default' />
        </div>
      );
    }
    if (customerId) {
      //New ticket form
      const customer = await getCustomer(parseInt(customerId));

      if (!customer) {
        return (
          <div>
            <h2>Customer ID# {customerId} not found </h2>
            <BackButton title='Back' size='default' variants='default' />
          </div>
        );
      }
      if (!customer.active) {
        return (
          <div>
            <h2>Customer ID# {customerId} is not active </h2>
            <BackButton title='Back' size='default' variants='default' />
          </div>
        );
      }

      //return ticket form
      if (isManager) {
        kindeInit();
        const { users } = await Users.getUsers();
        console.log(users);
        const techs = users
          ? users.map((user) => ({
              id: user.id!,
              name: user.email ? user.email : user.first_name!,
            }))
          : [];
        return (
          <div className='my-4'>
            <TicketsForm customer={customer} techs={techs} />
          </div>
        );
      } else {
        return (
          <div className='my-4'>
            <TicketsForm customer={customer} />
          </div>
        );
      }
    }

    if (ticketId) {
      //Edit Ticket form
      const ticket = await getTicket(parseInt(ticketId));
      if (!ticket) {
        return (
          <div>
            <h2>Ticket ID# {ticketId} not found </h2>
            <BackButton title='Back' size='default' variants='default' />
          </div>
        );
      }

      const customerX = await getCustomer(ticket.customersId);

      //return ticket form
      if (isManager) {
        kindeInit();
        const { users } = await Users.getUsers();
        const techs = users
          ? users.map((user) => ({ id: user.id!, name: user.email! }))
          : [];
        console.log(techs);
        return (
          <div>
            <TicketsForm customer={customerX!} ticket={ticket} techs={techs} />
          </div>
        );
      } else {
        const editable =
          user.email?.trim().toLowerCase() === ticket.tech.trim().toLowerCase();
        return (
          <div>
            <TicketsForm
              customer={customerX!}
              ticket={ticket}
              isEditable={editable}
            />
          </div>
        );
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export default TicketFormPage;
