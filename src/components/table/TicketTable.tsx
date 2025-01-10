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
import { useRouter as useNextRouter } from 'nextjs-toploader/app';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
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
import { usePolling } from '@/lib/usePolling';
import FilterRows from './FilterRows';
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
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const routerPage = useNextRouter();
  const router = useRouter();
  const params = useSearchParams();
  const searchedTextParam = params.get('searchText');
  const pageParam = useMemo(() => {
    const page = params.get('page');
    return page;
  }, [params]);
  useEffect(() => {
    if (pageParam) {
      const pageIndex = parseInt(pageParam);
      if (!isNaN(pageIndex)) {
        setPagination((prev) => ({ ...prev, pageIndex }));
      }
    }
  }, [pageParam]);
  usePolling(searchedTextParam, 300000);
  const columns: ColumnDef<RowType>[] = [
    {
      accessorKey: 'ticketDate',
      meta: {
        filterVariant: 'date',
      },

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
      accessorKey: 'updatedDate',
      meta: {
        filterVariant: 'date',
      },
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === 'asc');
            }}
          >
            Updated Date
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = row.getValue('updatedDate') as Date;
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
      meta: {
        filterVariant: 'text',
      },
      header: ({}) => {
        return <div className='h-9 pt-2 text-sm'>Title </div>;
      },
      cell: ({ row }) => (
        <div className='lowercase'>{row.getValue('title')}</div>
      ),
    },
    {
      accessorKey: 'firstName',
      header: ({}) => {
        return (
          <div className='h-9 pt-2 text-sm whitespace-nowrap'>First Name </div>
        );
      },
      meta: {
        filterVariant: 'text',
      },
      cell: ({ row }) => (
        <div className='lowercase'>{row.getValue('firstName')}</div>
      ),
    },
    {
      accessorKey: 'lastName',
      header: ({}) => {
        return (
          <div className='h-9 pt-2 text-sm whitespace-nowrap'>Last Name </div>
        );
      },
      meta: {
        filterVariant: 'text',
      },
      cell: ({ row }) => (
        <div className='lowercase'>{row.getValue('lastName')}</div>
      ),
    },
    {
      accessorKey: 'email',
      header: ({}) => {
        return <div className='h-9 pt-2 text-sm'>Email </div>;
      },
      meta: {
        filterVariant: 'text',
      },
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
      meta: {
        filterVariant: 'multiSelect',
      },
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

  const handlePageChange = (newPageIndex: number) => {
    // Update the URL with the new pageIndex
    const newParams = new URLSearchParams(params);
    console.log('init fn');
    newParams.delete('searchText');
    newParams.set('page', newPageIndex.toString());
    router.replace(`?${newParams.toString()}`, { scroll: false });
  };
  const table = useReactTable({
    data: isOpenTickets ? openTicketsData! : data!,
    columns,

    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    enableSorting: true,

    state: {
      sorting,
      pagination: {
        pageSize: 10,
        pageIndex: pagination.pageIndex,
      },
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
      <div className='rounded-xl border overflow-hidden'>
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
                            {header.column.getCanFilter() ? (
                              <FilterRows column={header.column} />
                            ) : null}
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
                          routerPage.push(
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
            <div className='flex flex-col xs:flex-row  px-4 py-2 items-center xs:items-start sm:items-center justify-between gap-4'>
              <div className='flex  gap-3'>
                <Button
                  disabled={!table.getCanPreviousPage()}
                  onClick={() => {
                    table.previousPage();
                    const newIndex = table.getState().pagination.pageIndex - 1;
                    handlePageChange(newIndex);
                  }}
                  variant={'outline'}
                  size={'icon'}
                >
                  <ArrowBigLeft />
                </Button>
                <Button
                  disabled={!table.getCanNextPage()}
                  onClick={() => {
                    table.nextPage();
                    const newIndex = table.getState().pagination.pageIndex + 1;
                    handlePageChange(newIndex);
                  }}
                  variant={'outline'}
                  size={'icon'}
                >
                  <ArrowBigRight />
                </Button>
              </div>
              <div className='flex gap-3 flex-col sm:flex-row   items-center  xs:items-end sm:items-center'>
                <Button
                  variant={'ghost'}
                  onClick={() => {
                    table.reset();
                  }}
                >
                  Reset Filters
                </Button>
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
          </div>
        )}
      </div>
    </div>
  );
};
export default TicketTable;
