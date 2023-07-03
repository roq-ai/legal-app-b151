import { ClientInterface } from 'interfaces/client';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface FirmInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  client?: ClientInterface[];
  user?: UserInterface;
  _count?: {
    client?: number;
  };
}

export interface FirmGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
