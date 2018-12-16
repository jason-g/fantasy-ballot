import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './ldb.datasource.json';

export class LdbDataSource extends juggler.DataSource {
  static dataSourceName = 'ldb';

  constructor(
    @inject('datasources.config.ldb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
