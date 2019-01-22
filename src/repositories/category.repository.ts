import { Category, Entry } from '../models';
import { DbDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
//import { EntryRepository } from './entry.repository';
import {
  DefaultCrudRepository,
  juggler,
  //  HasManyRepositoryFactory,
  //  repository,
} from '@loopback/repository';

export class CategoryRepository extends DefaultCrudRepository<
  Category,
  typeof Category.prototype.category_id
  > {
  /*
  public readonly entries: HasManyRepositoryFactory<
    Entry,
    typeof Category.prototype.category_id
  >;
  */
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    //@repository.getter('EntryRepository')
    //getEntryRepository: Getter<EntryRepository>
  ) {
    super(Category, dataSource);
    /*
    this.entries = this.createHasManyRepositoryFactoryFor(
      'entries',
      getEntryRepository,
    )
    */
  }
}
