'use client';
import {
  flexRender,
  getCoreRowModel,
  SortingState,
  useReactTable,
  ColumnDef,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
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
import {
  ArrowUpDown,
  CircleXIcon,
  CircleCheckIcon,
  ArrowBigLeft,
  ArrowBigRight,
} from 'lucide-react';
import { toast } from 'sonner';
import { TicketSearchResultsType } from '@/lib/queries';
import { useGetAllOpenTickets, useGetSearchedTickets } from '@/lib/get-tickets';
import TableSkeleton from './TableSkeleton';

type Props = {
  searchText?: string;
  isOpenTickets?: boolean;
};
type RowType = NonNullable<TicketSearchResultsType>[0];
const TicketTable: React.FC<Props> = ({
  searchText,
  isOpenTickets = false,
}) => {
  const { data, isFetching } = useGetSearchedTickets(searchText!);
  const { data: openTicketsData } = useGetAllOpenTickets();
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
          <div className='lowercase  place-items-center'>
            {completed ? (
              <CircleCheckIcon className='text-green-300' />
            ) : (
              <CircleXIcon className='text-red-300' />
            )}
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: isOpenTickets ? openTicketsData! : data!,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableSorting: true,
    initialState: {
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
    },
    state: {
      sorting,
    },
  });
  const headersArray = [
    'Ticket Date',
    'Title',
    'First Name',
    'Last Name',
    'Email',
    'Completed',
  ];
  const rowArray = [
    'row1',
    'row2',
    'row3',
    'row4',
    'row5',
    'row6',
    'row7',
    'row8',
    'row9',
    'row10',
  ];
  return (
    <div className='my-10'>
      <h1 className='subheading mb-4'>Ticket Table</h1>
      <div className='rounded-xl border'>
        {isFetching ? (
          <TableSkeleton headersArray={headersArray} rowArray={rowArray} />
        ) : (
          <div className=''>
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
                            `/tickets/form?ticketId=${row.original.id}`
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
                    <TableCell
                      colSpan={columns.length}
                      className=' text-center'
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div className='flex  px-4 py-2 items-center justify-between gap-4'>
              <div className='flex gap-3'>
                <Button
                  disabled={!table.getCanPreviousPage()}
                  onClick={() => table.previousPage()}
                  variant={'outline'}
                  size={'icon'}
                >
                  <ArrowBigLeft />
                </Button>
                <Button
                  disabled={!table.getCanNextPage()}
                  onClick={() => table.nextPage()}
                  variant={'outline'}
                  size={'icon'}
                >
                  <ArrowBigRight />
                </Button>
              </div>
              <div>
                <p className='whitespace-nowrap font-bold flex gap-2'>
                  <span>
                    {`Page ${
                      table.getState().pagination.pageIndex + 1
                    } of  ${table.getPageCount()} `}
                  </span>

                  <span>
                    {`( ${table.getFilteredRowModel().rows.length} ${
                      table.getFilteredRowModel().rows.length !== 1
                        ? 'total results'
                        : 'total result'
                    })`}
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default TicketTable;
