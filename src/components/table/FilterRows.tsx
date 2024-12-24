import { Column } from '@tanstack/react-table';
import DebouncedInput from '../inputs/DebouncedInput';

type Props<T> = {
  column: Column<T, unknown>;
};
const FilterRows = <T,>({ column }: Props<T>) => {
  const columnFilterValue = column.getFilterValue();
  return (
    <DebouncedInput
      className='w-full border dark:bg-white  rounded  mb-2'
      onChange={(value) => column.setFilterValue(value)}
      placeholder={`Search...`}
      type='text'
      value={(columnFilterValue ?? '') as string}
    />
  );
};
export default FilterRows;
