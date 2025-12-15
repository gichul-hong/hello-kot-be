'use client';

import CRUDTable from '@/components/CRUDTable';

export default function ProductsPage() {
  return (
    <CRUDTable
      endpoint="/products"
      entityName="Product"
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        {
          key: 'price',
          label: 'Price',
          render: (value) => `$${parseFloat(value).toFixed(2)}`,
        },
      ]}
      formFields={[
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'price', label: 'Price', type: 'number', required: true },
      ]}
    />
  );
}
