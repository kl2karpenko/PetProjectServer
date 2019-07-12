import knex from 'knex';

const db = ({
    client: 'postgres',
    connection: process.env.PG_CONNECTION_STRING,
    searchPath: ['knex', 'public'],
});

export default db;