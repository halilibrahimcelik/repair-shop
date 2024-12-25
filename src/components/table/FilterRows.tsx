import { Column } from '@tanstack/react-table';
import DebouncedInput from '../inputs/DebouncedInput';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type Props<T> = {
  column: Column<T, unknown>;
};
const FilterRows = <T,>({ column }: Props<T>) => {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};
  const multipleOpenObj = [
    {
      id: '0',
      name: 'All',
    },
    {
      id: '1',
      name: 'Yes',
      value: false,
    },
    {
      id: '2',
      name: 'No',
      value: true,
    },
  ];

  if (filterVariant === 'date') {
    return null;
  }
  if (filterVariant === 'text') {
    return (
      <DebouncedInput
        className='w-full border dark:bg-white  rounded  mb-2'
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search...`}
        type='text'
        value={(columnFilterValue ?? '') as string}
      />
    );
  }
  if (filterVariant === 'multiSelect') {
    console.log(columnFilterValue, 'multiSelect');
    //I want to send true  as boolean if open is selected and false if close is selected to my table

    return (
      <Select
        onValueChange={(value) => {
          const booleanValue =
            value === 'Yes' ? true : value === 'No' ? false : null;
          column.setFilterValue(booleanValue);
        }}
        defaultValue={columnFilterValue as string}
      >
        <>
          <SelectTrigger className={`w-full bg-white mt-2 `}>
            <SelectValue placeholder='Select' />
          </SelectTrigger>
        </>
        <SelectContent>
          {multipleOpenObj.map(({ id, name }) => {
            return (
              <SelectItem defaultValue={'All'} key={id} value={name}>
                {' '}
                {name}{' '}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    );
  }
  return null;
};
export default FilterRows;
