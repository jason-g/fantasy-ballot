import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Category} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CategoryRepository extends DefaultCrudRepository<
  Category,
  typeof Category.prototype.category_id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Category, dataSource);
  }
}
