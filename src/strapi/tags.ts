/**
 * Model definition for Tag
 */
export interface ITag {
  id: string;
  title: string;
  theme?: string;
  created_at: Date;
  updated_at: Date;
  published_at: Date;
}