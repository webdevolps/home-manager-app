export interface Tenant {
  id: string;
  name: string;
  domain?: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
}
