import * as Knex from 'knex';
import { Service } from 'typedi';

import { DATABASE_NAME, DEFAULT_HOST, DEFAULT_PASS, DEFAULT_PORT, DEFAULT_USER } from './constants';

import camelcaseKeys = require('camelcase-keys');
// tslint:disable-next-line
const PgNativeResult = require('pg/lib/result');

import { get } from 'lodash';

@Service()
export class DataBaseConnector {
  public host!: string;
  public port!: number;
  private username!: string;
  private password!: string;
  public database!: string;
  private connectionString!: string;
  private pool: Knex | undefined;

  constructor(host: string, port: number, username: string, password: string, database: string) {
    this.create(host, port, username, password, database);
  }

  public create(host: string, port: number, username: string, password: string, database: string) {
    this.database = database || DATABASE_NAME || 'main';
    this.password = password || DEFAULT_PASS;
    this.host = host || DEFAULT_HOST;
    this.port = port || DEFAULT_PORT;
    this.username = username || DEFAULT_USER;

    this.connectionString = `postgres://${username}:${password}@${host}:${port}`;
  }

  public async createDbConnection(): Promise<Knex> {
    return Knex({
      client: 'postgres',
      connection: `${this.connectionString}/${this.database}`,
      searchPath: ['public'],
      postProcessResponse: (result: any) => {
        if (get(result, 'rows[0].data') instanceof Buffer) {
          return result;
        }

        if (Array.isArray(result)) {
          return result.map(row => camelcaseKeys(row, { deep: true }));
        }

        if (typeof result === 'object') {
          const camelCasedResult = camelcaseKeys(result, { deep: true });
          if (result instanceof PgNativeResult) {
            Object.defineProperties(camelCasedResult, {
              hasSingleRecord: {
                get(): boolean {
                  return this.rowCount === 1;
                },
              },
              isEmpty: {
                get(): boolean {
                  return this.rowCount === 0 || this.rowCount === null;
                },
              },
              firstRecord: {
                get(): boolean {
                  return this.rows[0];
                },
              },
            });
          }
          return camelCasedResult;
        }
        return result;
      },
    });
  }
}
