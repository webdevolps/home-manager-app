import { Tenant } from './tenant.interface';

export interface User {
  id: string;
  email: string;
  name?: string;
  tenant_id: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  tenant: Tenant;
}
