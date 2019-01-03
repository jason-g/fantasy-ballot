import { Entity, model, property, hasMany } from '@loopback/repository';
import { Entry } from './entry.model';

@model()
export class Category extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
  })
  category_id: number;

  @property({
    type: 'string',
    required: true,
  })
  display_name: string;

  @property({
    type: 'string',
  })
  display_content?: string;

  @hasMany(() => Entry, { keyTo: 'category_id' })
  entries: Entry[];

  //@property.array(Entry)
  //entries: Entry[];

  constructor(data?: Partial<Category>) {
    super(data);
  }
}
