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
import {Entree} from '../models';
import {EntreeRepository} from '../repositories';

export class EntreeController {
  constructor(
    @repository(EntreeRepository)
    public entreeRepository : EntreeRepository,
  ) {}

  @post('/entrees', {
    responses: {
      '200': {
        description: 'Entree model instance',
        content: {'application/json': {schema: {'x-ts-type': Entree}}},
      },
    },
  })
  async create(@requestBody() entree: Entree): Promise<Entree> {
    return await this.entreeRepository.create(entree);
  }

  @get('/entrees/count', {
    responses: {
      '200': {
        description: 'Entree model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Entree)) where?: Where,
  ): Promise<Count> {
    return await this.entreeRepository.count(where);
  }

  @get('/entrees', {
    responses: {
      '200': {
        description: 'Array of Entree model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Entree}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Entree)) filter?: Filter,
  ): Promise<Entree[]> {
    return await this.entreeRepository.find(filter);
  }

  @patch('/entrees', {
    responses: {
      '200': {
        description: 'Entree PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() entree: Entree,
    @param.query.object('where', getWhereSchemaFor(Entree)) where?: Where,
  ): Promise<Count> {
    return await this.entreeRepository.updateAll(entree, where);
  }

  @get('/entrees/{id}', {
    responses: {
      '200': {
        description: 'Entree model instance',
        content: {'application/json': {schema: {'x-ts-type': Entree}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Entree> {
    return await this.entreeRepository.findById(id);
  }

  @patch('/entrees/{id}', {
    responses: {
      '204': {
        description: 'Entree PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() entree: Entree,
  ): Promise<void> {
    await this.entreeRepository.updateById(id, entree);
  }

  @put('/entrees/{id}', {
    responses: {
      '204': {
        description: 'Entree PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() entree: Entree,
  ): Promise<void> {
    await this.entreeRepository.replaceById(id, entree);
  }

  @del('/entrees/{id}', {
    responses: {
      '204': {
        description: 'Entree DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.entreeRepository.deleteById(id);
  }
}
