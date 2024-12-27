import '@tanstack/react-table'; //or vue, svelte, solid, qwik, etc.

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant:
      | 'date'
      | 'text'
      | 'number'
      | 'select'
      | 'multiSelect'
      | 'checkbox';
  }
}
