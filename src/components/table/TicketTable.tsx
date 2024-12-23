'use client';
import { SelectTicketSchemaType } from '@/zod-schemas/tickets';
import {
  flexRender,
  getCoreRowModel,
  SortingState,
  useReactTable,
  ColumnDef,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { useRouter } from 'nextjs-toploader/app';
import { useState } from 'react';
import { Button } from '../ui/button';
import { ArrowUpDown, CircleXIcon, CircleCheckIcon } from 'lucide-react';
import { toast } from 'sonner';
import { TicketSearchResultsType } from '@/lib/queries';

type Props = {
  data: TicketSearchResultsType;
};
type RowType = NonNullable<TicketSearchResultsType>[0];
const TicketTable: React.FC<Props> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const router = useRouter();

  const columns: ColumnDef<RowType>[] = [
    {
      accessorKey: 'ticketDate',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === 'asc');
            }}
          >
            Ticket Date
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = row.getValue('ticketDate') as Date;
        const dateStr = date.toLocaleDateString('en-Us', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });

        return <div className='lowercase'>{dateStr}</div>;
      },
    },
    {
      accessorKey: 'title',
      header: ({}) => {
        return <div>Title</div>;
      },
      cell: ({ row }) => (
        <div className='lowercase'>{row.getValue('title')}</div>
      ),
    },
    {
      accessorKey: 'firstName',
      header: 'First Name',
      cell: ({ row }) => (
        <div className='lowercase'>{row.getValue('firstName')}</div>
      ),
    },
    {
      accessorKey: 'lastName',
      header: 'Last Name',
      cell: ({ row }) => (
        <div className='lowercase'>{row.getValue('lastName')}</div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => (
        <div className='lowercase'>
          <Button
            variant={'ghost'}
            onClick={(e) => {
              e.stopPropagation();
              toast.success(`${row.getValue('email')} coppied`, {
                duration: 1200,

                dismissible: true,
                classNames: {
                  closeButton: 'toast-close-btn',
                },
                closeButton: true,
                className: 'w-fit',
                richColors: true,
              });
              navigator.clipboard.writeText(row.getValue('email'));
            }}
          >
            {row.getValue('email')}
          </Button>
        </div>
      ),
    },
    {
      accessorKey: 'completed',
      header: 'Completed',
      cell: ({ row }) => {
        const completed = row.getValue('completed') as boolean;

        return (
          <div className='lowercase'>{completed ? 'Completed' : 'Open'}</div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data!,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableSorting: true,

    state: {
      sorting,
    },
  });

  return (
    <div>
      <h1 className='subheading'>Ticket Table</h1>
      <div className='rounded-xl border'>
        <Table className='w-full'>
          <TableHeader className='rounded-tl-lg overflow-hidden'>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => {
                    return (
                      <TableHead
                        className={`
                      bg-secondary  ${index === 0 ? 'rounded-tl-lg' : ''} ${
                          index === headerGroup.headers.length - 1
                            ? 'rounded-tr-lg'
                            : ''
                        }
                      `}
                        key={header.id}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow
                    onClick={() => {
                      router.push(
                        `/customers/form?customerId=${row.original.id}`
                      );
                    }}
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className=' text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default TicketTable;
