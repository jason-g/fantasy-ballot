import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Category } from './category.model';

@model()
export class Entry extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
  })
  entry_id: number;

  @property({
    type: 'string',
    required: true,
  })
  display_name: string;

  @property({
    type: 'string',
  })
  featured_image?: string;

  @property({
    type: 'string',
  })
  featured_video?: string;

  @property({
    type: 'string',
    required: true,
  })
  display_content: string;

  @property({
    type: 'number',
    required: true,
  })
  category_id: number;

  constructor(data?: Partial<Entry>) {
    super(data);
  }
}
