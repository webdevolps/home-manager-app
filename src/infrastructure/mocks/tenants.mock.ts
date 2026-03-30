export interface MockTenant {
  id: string;
  name: string;
  domain: string;
}

export const tenantsMock: MockTenant[] = [
  {
    id: 'tenant-agnes-101',
    name: 'Agnes Demo Corp',
    domain: 'demo'
  },
  {
    id: 'tenant-constructora-202',
    name: 'Constructora Beta',
    domain: 'beta'
  }
];
