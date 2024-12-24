'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  headersArray: string[];
  rowArray: string[];
};
const TableSkeleton: React.FC<Props> = ({ headersArray, rowArray }) => {
  return (
    <div>
      <Table className='w-full'>
        <TableHeader className='rounded-tl-lg overflow-hidden'>
          <TableRow>
            {headersArray.map((header, index) => {
              return (
                <TableHead
                  className={`
                          bg-secondary  ${index === 0 ? 'rounded-tl-lg' : ''} ${
                    index === headersArray.length - 1 ? 'rounded-tr-lg' : ''
                  }
                          `}
                  key={index + '_' + header}
                >
                  <Skeleton className='h-4 w-full' />
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rowArray.map((row, index) => {
            return (
              <TableRow className='pointer-events-none' key={index}>
                {headersArray.map((cell, index) => {
                  return (
                    <TableCell key={index + '_' + cell}>
                      <Skeleton className='h-4 w-full' />
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
export default TableSkeleton;
