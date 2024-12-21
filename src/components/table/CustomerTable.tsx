'use client';
import { SelectCusctomerSchemaType } from '@/zod-schemas/customer';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
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

type Props = {
  data: SelectCusctomerSchemaType[];
};
const CustomerTable: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const columnHeadersArray: Array<keyof SelectCusctomerSchemaType> = [
    'firstName',
    'lastName',
    'address1',
    'email',
    'city',
    'phone',
    'state',
  ];
  const columnHelper = createColumnHelper<SelectCusctomerSchemaType>();
  const columns = columnHeadersArray.map((columnName) => {
    return columnHelper.accessor(columnName, {
      id: columnName,
      header: columnName.charAt(0).toUpperCase() + columnName.slice(1),
    });
  });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <h1>Customer Table</h1>
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
export default CustomerTable;
