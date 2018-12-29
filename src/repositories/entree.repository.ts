import {
  BelongsToAccessor,
  DefaultCrudRepository,
  juggler,
  repository,
} from '@loopback/repository';
import { Entree, Category } from '../models';
import { LdbDataSource } from '../datasources';
//import {inject} from '@loopback/core';
import { Getter, inject } from '@loopback/context';
import { CategoryRepository } from './category.repository';


export class EntreeRepository extends DefaultCrudRepository<
  Entree,
  typeof Entree.prototype.entree_id
  > {
  public readonly category: BelongsToAccessor<
    Category,
    typeof Entree.prototype.entree_id
    >;
  constructor(
    @inject('datasources.ldb') dataSource: LdbDataSource,
    @repository.getter('CategoryRepository')
    CategoryRepositoryGetter: Getter<CategoryRepository>,
  ) {
    super(Entree, dataSource);
    this.category = this.createBelongsToAccessorFor(
      'category_id',
      CategoryRepositoryGetter,
    );
  }
}
