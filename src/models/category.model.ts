import {Entity, model, property} from '@loopback/repository';

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

  constructor(data?: Partial<Category>) {
    super(data);
  }
}
