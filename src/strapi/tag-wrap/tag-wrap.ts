import { ITag } from '../tags';

/**
 * Model definition for tag_wrap
 */
export interface ITag_wrap {
  id: string;
  tag?: ITag;
  created_at: Date;
  updated_at: Date;
  published_at: Date;
}