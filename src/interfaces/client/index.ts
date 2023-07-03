import { FirmInterface } from 'interfaces/firm';
import { GetQueryInterface } from 'interfaces';

export interface ClientInterface {
  id?: string;
  name: string;
  contact_info: string;
  firm_id?: string;
  created_at?: any;
  updated_at?: any;

  firm?: FirmInterface;
  _count?: {};
}

export interface ClientGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  contact_info?: string;
  firm_id?: string;
}
