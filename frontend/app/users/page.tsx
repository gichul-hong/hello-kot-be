'use client';

import CRUDTable from '@/components/CRUDTable';

export default function UsersPage() {
  return (
    <CRUDTable
      endpoint="/users"
      entityName="User"
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
      ]}
      formFields={[
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
      ]}
    />
  );
}
