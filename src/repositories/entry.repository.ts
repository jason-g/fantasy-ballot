import {
  BelongsToAccessor,
  DefaultCrudRepository,
  juggler,
  repository,
} from '@loopback/repository';
import { Entry, Category } from '../models';
import { LdbDataSource } from '../datasources';
//import {inject} from '@loopback/core';
import { Getter, inject } from '@loopback/context';
import { CategoryRepository } from './category.repository';


export class EntryRepository extends DefaultCrudRepository<
  Entry,
  typeof Entry.prototype.entry_id
  > {
  //public readonly category: BelongsToAccessor<
  //  Category,
  //  typeof Entry.prototype.entry_id
  //  >;
  constructor(
    @inject('datasources.ldb') dataSource: LdbDataSource,
    //@repository.getter('CategoryRepository')
    //CategoryRepositoryGetter: Getter<CategoryRepository>,
  ) {
    super(Entry, dataSource);
    //this.category = this.createBelongsToAccessorFor(
    //  'category_id',
    //  CategoryRepositoryGetter,
    //);
  }
}
