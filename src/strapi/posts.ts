import { IFile } from './file';
import { ITag_wrap } from './tag-wrap/tag-wrap';

/**
 * Model definition for Post
 */
export interface IPost {
  id: string;
  title: string;
  description: string;
  featured_image: IFile;
  article: string;
  slug: string;
  tags: (
    | ({ __component: 'tag-wrap.tag-wrap' } & ITag_wrap)
  )[];
  created_at: Date;
  updated_at: Date;
  published_at: Date;
}