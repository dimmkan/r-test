const knex_base = require('knex')({
    client: 'pg',
    connection: {
        host : process.env.DB_HOST,
        user : process.env.POSTGRES_USER,
        password : process.env.POSTGRES_PASSWORD,
        database : process.env.POSTGRES_DB,
        port: 5432
    },
    useNullAsDefault: true
});

module.exports = knex_base;