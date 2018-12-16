import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Entree} from '../models';
import {LdbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class EntreeRepository extends DefaultCrudRepository<
  Entree,
  typeof Entree.prototype.entree_id
> {
  constructor(
    @inject('datasources.ldb') dataSource: LdbDataSource,
  ) {
    super(Entree, dataSource);
  }
}
