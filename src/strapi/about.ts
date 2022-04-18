import { ILabelled_field } from './labelled-field/labelled-field';

/**
 * Model definition for About
 */
export interface IAbout {
  id: string;
  fields: (
    | ({ __component: 'labelled-field.labelled-field' } & ILabelled_field)
  )[];
  created_at: Date;
  updated_at: Date;
  published_at: Date;
}