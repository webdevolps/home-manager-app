export interface MockUser {
  id: string;
  email: string;
  name: string;
  tenant_id: string;
  password?: string;
}

export const usersMock: MockUser[] = [
  {
    id: 'usr-admin-agnes',
    email: 'admin@agnes.com',
    name: 'Admin Agnes',
    tenant_id: 'tenant-agnes-101',
    password: '123'
  },
  {
    id: 'usr-admin-beta',
    email: 'admin@constructora.com',
    name: 'Admin Constructora',
    tenant_id: 'tenant-constructora-202',
    password: '123'
  }
];
