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
import { ArrowUpDown } from 'lucide-react';
import { toast } from 'sonner';
import {
  useGetAllCustomers,
  useGetSearchedCustomers,
} from '@/lib/get-customers';
import TableSkeleton from './TableSkeleton';

type Props = {
  searchText?: string;
  isAllCustomers?: boolean;
};
const CustomerTable: React.FC<Props> = ({ searchText, isAllCustomers }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const { data: allCustomers } = useGetAllCustomers();
  const { data, isFetching } = useGetSearchedCustomers(searchText!);
  const router = useRouter();

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
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className='lowercase'>{row.getValue('firstName')}</div>
      ),
    },
    {
      accessorKey: 'lastName',
      header: ({}) => {
        return <div>Last Name</div>;
      },
      cell: ({ row }) => (
        <div className='lowercase'>{row.getValue('lastName')}</div>
      ),
    },
    {
      accessorKey: 'address1',
      header: 'Address',
      cell: ({ row }) => (
        <div className='lowercase'>{row.getValue('address1')}</div>
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
      accessorKey: 'city',
      header: 'City',
      cell: ({ row }) => (
        <div className='lowercase'>{row.getValue('city')}</div>
      ),
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
      cell: ({ row }) => (
        <div className='lowercase'>{row.getValue('phone')}</div>
      ),
    },
    {
      accessorKey: 'state',
      header: 'State',
      cell: ({ row }) => (
        <div className='lowercase'>{row.getValue('state')}</div>
      ),
    },
  ];

  const table = useReactTable({
    data: isAllCustomers ? allCustomers! : data!,
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
      <h1 className='subheading mb-4'>Customer Table</h1>
      <div className='rounded-xl border'>
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
