export interface MockEmployee {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  tenant_id: string;
}

const TENANT_AGNES = 'tenant-agnes-101';
const TENANT_CONSTRUCTORA = 'tenant-constructora-202';

export const employeesMock: MockEmployee[] = [
  // Empleados de Agnes Demo Corp (tenant-agnes-101)
  {
    id: 'emp-ag-001',
    name: 'Roberto Gómez',
    email: 'rgomez@agnes.com',
    role: 'Employee',
    status: 'active',
    tenant_id: TENANT_AGNES
  },
  {
    id: 'emp-ag-002',
    name: 'Marta Díaz',
    email: 'mdiaz@agnes.com',
    role: 'Manager',
    status: 'active',
    tenant_id: TENANT_AGNES
  },
  {
    id: 'emp-ag-003',
    name: 'Luis Suárez',
    email: 'lsuarez@agnes.com',
    role: 'Employee',
    status: 'inactive',
    tenant_id: TENANT_AGNES
  },
  {
    id: 'emp-ag-004',
    name: 'Elena Robles',
    email: 'erobles@agnes.com',
    role: 'Employee',
    status: 'active',
    tenant_id: TENANT_AGNES
  },
  {
    id: 'emp-ag-005',
    name: 'Javier Pino',
    email: 'jpino@agnes.com',
    role: 'Admin',
    status: 'active',
    tenant_id: TENANT_AGNES
  },
  // Empleados de Constructora Beta (tenant-constructora-202)
  {
    id: 'emp-cb-001',
    name: 'Carlos Mendoza',
    email: 'cmendoza@constructora.com',
    role: 'Director',
    status: 'active',
    tenant_id: TENANT_CONSTRUCTORA
  },
  {
    id: 'emp-cb-002',
    name: 'Ana Torres',
    email: 'atorres@constructora.com',
    role: 'Supervisor',
    status: 'active',
    tenant_id: TENANT_CONSTRUCTORA
  },
  {
    id: 'emp-cb-003',
    name: 'Diego Valdés',
    email: 'dvaldes@constructora.com',
    role: 'Obrero',
    status: 'inactive',
    tenant_id: TENANT_CONSTRUCTORA
  },
  {
    id: 'emp-cb-004',
    name: 'Lucía Vega',
    email: 'lvega@constructora.com',
    role: 'Logística',
    status: 'active',
    tenant_id: TENANT_CONSTRUCTORA
  },
  {
    id: 'emp-cb-005',
    name: 'Fernando Silva',
    email: 'fsilva@constructora.com',
    role: 'Operador',
    status: 'active',
    tenant_id: TENANT_CONSTRUCTORA
  }
];
