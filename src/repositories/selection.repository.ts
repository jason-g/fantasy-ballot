import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Selection} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SelectionRepository extends DefaultCrudRepository<
  Selection,
  typeof Selection.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Selection, dataSource);
  }
}
