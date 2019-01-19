import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { Selection } from '../models';
import { SelectionRepository } from '../repositories';

export class SelectionController {
  constructor(
    @repository(SelectionRepository)
    public selectionRepository: SelectionRepository,
  ) { }

  @post('/selections', {
    responses: {
      '200': {
        description: 'Selection model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Selection } } },
      },
    },
  })
  async create(@requestBody() selection: Selection): Promise<Selection> {
    return await this.selectionRepository.create(selection);
  }

  @get('/selections/count', {
    responses: {
      '200': {
        description: 'Selection model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Selection)) where?: Where,
  ): Promise<Count> {
    return await this.selectionRepository.count(where);
  }

  @get('/selections', {
    responses: {
      '200': {
        description: 'Array of Selection model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Selection } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Selection)) filter?: Filter,
  ): Promise<Selection[]> {
    return await this.selectionRepository.find(filter);
  }

  /*
  @patch('/selections', {
    responses: {
      '200': {
        description: 'Selection PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() selection: Selection,
    @param.query.object('where', getWhereSchemaFor(Selection)) where?: Where,
  ): Promise<Count> {
    return await this.selectionRepository.updateAll(selection, where);
  }
  */

  @get('/selections/{id}', {
    responses: {
      '200': {
        description: 'Selection model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Selection } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Selection> {
    return await this.selectionRepository.findById(id);
  }

  /*
  @patch('/selections/{id}', {
    responses: {
      '204': {
        description: 'Selection PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() selection: Selection,
  ): Promise<void> {
    await this.selectionRepository.updateById(id, selection);
  }
  */

  @put('/selections/{id}', {
    responses: {
      '204': {
        description: 'Selection PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() selection: Selection,
  ): Promise<void> {
    await this.selectionRepository.replaceById(id, selection);
  }

  @del('/selections/{id}', {
    responses: {
      '204': {
        description: 'Selection DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.selectionRepository.deleteById(id);
  }
}
