import { IPermission } from './permission';
import { IUser } from './user';

/**
 * Model definition for role
 */
export interface IRole {
  id: string;
  name: string;
  description?: string;
  type?: string;
  permissions: IPermission[];
  users: IUser[];
  created_at: Date;
  updated_at: Date;
  published_at: Date;
}