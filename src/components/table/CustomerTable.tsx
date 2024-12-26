'use client';
import { SelectCusctomerSchemaType } from '@/zod-schemas/customer';

import {
  flexRender,
  getCoreRowModel,
  SortingState,
  useReactTable,
  ColumnDef,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
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
import { useState } from 'react';
import { Button } from '../ui/button';
import { ArrowUpDown } from 'lucide-react';
import { toast } from 'sonner';
import {
  useGetAllCustomers,
  useGetSearchedCustomers,
} from '@/lib/get-customers';
import TableSkeleton from './TableSkeleton';
import FilterRows from './FilterRows';

type Props = {
  searchText?: string;
  isAllCustomers?: boolean;
};
const CustomerTable: React.FC<Props> = ({ searchText, isAllCustomers }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilter] = useState<ColumnFiltersState>([]);
  const { data: allCustomers } = useGetAllCustomers();
  const { data, isFetching } = useGetSearchedCustomers(searchText!);
  const router = useNextRouter();
  const searchParams = useSearchParams();
  const routerNavigation = useRouter();

  const updateSearchParams = (newParams: URLSearchParams) => {
    routerNavigation.push(`?${newParams.toString()}`);
  };

  const columns: ColumnDef<SelectCusctomerSchemaType>[] = [
    {
      accessorKey: 'firstName',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === 'asc');
            }}
          >
            First Name
            <ArrowUpDown size={20} />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className='lowercase whi'>{row.getValue('firstName')}</div>
      ),
    },
    {
      accessorKey: 'lastName',
      header: ({}) => {
        return (
          <div className='h-9 pt-2 text-sm whitespace-nowrap'>Last Name</div>
        );
      },
      cell: ({ row }) => (
        <div className='lowercase'>{row.getValue('lastName')}</div>
      ),
    },
    {
      accessorKey: 'address1',
      header: ({}) => {
        return <div className='h-9 pt-2 text-sm'>Address</div>;
      },
      cell: ({ row }) => (
        <div className='lowercase'>{row.getValue('address1')}</div>
      ),
    },
    {
      accessorKey: 'email',
      header: ({}) => {
        return <div className='h-9 pt-2 text-sm'>Email</div>;
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
      accessorKey: 'city',
      header: ({}) => {
        return <div className='h-9 pt-2 text-sm'>City</div>;
      },
      cell: ({ row }) => (
        <div className='lowercase'>{row.getValue('city')}</div>
      ),
    },
    {
      accessorKey: 'phone',
      header: ({}) => {
        return <div className='h-9 pt-2 text-sm'>Phone</div>;
      },
      cell: ({ row }) => (
        <div className='lowercase'>{row.getValue('phone')}</div>
      ),
    },
    {
      accessorKey: 'state',
      header: ({}) => {
        return <div className='h-9 pt-2 text-sm'>State</div>;
      },
      cell: ({ row }) => (
        <div className='lowercase'>{row.getValue('state')}</div>
      ),
    },
  ];

  const table = useReactTable({
    data: isAllCustomers ? allCustomers! : data!,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableSorting: true,

    state: {
      sorting,
      columnFilters,
    },
  });
  const headerArray = [
    'First Name',
    'Last Name',
    'Address',
    'Email',
    'City',
    'Phone',
    'State',
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
      <div className='flex gap-2 items-center justify-between mb-4'>
        <h1 className='subheading '>Customer Table</h1>
        <Button
          onClick={() => {
            const newParams = new URLSearchParams(searchParams.toString());
            newParams.set('searchText', '');
            updateSearchParams(newParams);
            table.resetColumnFilters();
          }}
          variant={'outline'}
        >
          Reset Filter
        </Button>
      </div>
      <div className='rounded-xl border overflow-hidden'>
        {isFetching ? (
          <TableSkeleton headersArray={headerArray} rowArray={rowArray} />
        ) : (
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
                            <FilterRows<SelectCusctomerSchemaType>
                              column={header.column}
                            />
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
        )}
      </div>
    </div>
  );
};
export default CustomerTable;
