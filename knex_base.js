const knex_base = require('knex')({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : '',
        database : 'rarus',
        port: 5432
    },
    useNullAsDefault: true
});

module.exports = knex_base;