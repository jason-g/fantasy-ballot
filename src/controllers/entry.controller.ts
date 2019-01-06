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
import { Category, Entry } from '../models';
import { EntryRepository } from '../repositories';

export class EntryController {
  constructor(
    @repository(EntryRepository)
    public entryRepository: EntryRepository,
  ) { }

  @post('/entries', {
    responses: {
      '200': {
        description: 'Entry model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Entry } } },
      },
    },
  })
  async create(@requestBody() entry: Entry): Promise<Entry> {
    return await this.entryRepository.create(entry);
  }

  @get('/entries/count', {
    responses: {
      '200': {
        description: 'Entry model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Entry)) where?: Where,
  ): Promise<Count> {
    return await this.entryRepository.count(where);
  }

  @get('/entries', {
    operationId: "getEntries",
    responses: {
      '200': {
        description: 'Array of Entry model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Entry } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Entry)) filter?: Filter,
  ): Promise<Entry[]> {
    return await this.entryRepository.find(filter);
  }

  /*
  TBD
  ref: https://github.com/strongloop/oasgraph/issues/87
  @patch('/entries', {
    responses: {
      '200': {
        description: 'Entry PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() entry: Entry,
    @param.query.object('where', getWhereSchemaFor(Entry)) where?: Where,
  ): Promise<Count> {
    return await this.entryRepository.updateAll(entry, where);
  }
  */

  @get('/entries/{id}', {
    responses: {
      '200': {
        description: 'Entry model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Entry } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Entry> {
    return await this.entryRepository.findById(id);
  }

  /*
  @get('/entries/{id}/category', {
    responses: {
      '200': {
        description: 'Entry model Category instance',
        content: { 'application/json': { schema: { 'x-ts-type': Category } } },
      },
    },
  })
  async getCategory(
    @param.path.number('id') entryId: typeof Entry.prototype.entry_id,
  ): Promise<Category> {
    return await this.entryRepository.category(entryId);
  }
*/

  @patch('/entries/{id}', {
    responses: {
      '204': {
        description: 'Entry PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() entry: Entry,
  ): Promise<void> {
    await this.entryRepository.updateById(id, entry);
  }

  @put('/entries/{id}', {
    responses: {
      '204': {
        description: 'Entry PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() entry: Entry,
  ): Promise<void> {
    await this.entryRepository.replaceById(id, entry);
  }

  @del('/entries/{id}', {
    responses: {
      '204': {
        description: 'Entry DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.entryRepository.deleteById(id);
  }
}
