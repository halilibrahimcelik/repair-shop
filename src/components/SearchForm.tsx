import Form from 'next/form';
import { Input } from './ui/input';
import SearchButton from './SearchButton';

type Props = {
  searchText?: string;
  action: string;
};
const SearchForm: React.FC<Props> = ({ searchText, action }) => {
  return (
    <Form className='flex items-center gap-2 p-2 max-w-lg' action={action}>
      <Input
        defaultValue={searchText!}
        name='searchText'
        placeholder='Search'
        className='w-full border rounded-lg'
      />
      <SearchButton />
    </Form>
  );
};
export default SearchForm;
