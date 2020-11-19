// CREATE TABLE products (
//   id SERIAL PRIMARY KEY,
//   sku TEXT UNIQUE NOT NULL,
//   name TEXT NOT NULL,
//   description TEXT NOT NULL,
//   created_at TIMESTAMP NOT NULL
// );

exports.up = function(knex) {
  return knex.schema.createTable('products', (table) => {
    table.increments('id').primary();
    table.text('sku').unique().notNullable();
    table.text('name').notNullable();
    table.text('description').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('products');
};
