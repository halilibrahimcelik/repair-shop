import { BackButton } from '@/components/BackButton';
import { getTicket, getCustomer } from '@/lib/queries';

type Props = {
  searchParams: Promise<{
    ticketId: string | undefined;
    customerId: string | undefined;
  }>;
};
const TicketFormPage: React.FC<Props> = async ({ searchParams }) => {
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
      return (
        <div>
          <h1>New ticket form for customer id# {customerId} </h1>
        </div>
      );
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

      const customer = await getCustomer(ticket.customersId);
      console.log(customer);
      //return ticket form
      return (
        <div>
          <h1>Edit ticket form for ticket id# {ticketId} </h1>
        </div>
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export default TicketFormPage;
