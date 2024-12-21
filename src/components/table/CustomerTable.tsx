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
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { useRouter } from 'next/navigation';

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
      <div className='rounded-lm border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
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
