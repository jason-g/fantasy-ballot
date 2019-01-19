import { Entity, model, property } from '@loopback/repository';

@model()
export class Selection extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'number',
    required: true,
  })
  user_id: number;

  @property({
    type: 'number',
    required: true,
  })
  category_id: number;

  @property({
    type: 'number',
    required: true,
  })
  entry_id: number;

  constructor(data?: Partial<Selection>) {
    super(data);
  }
}
