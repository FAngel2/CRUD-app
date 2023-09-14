exports.up = function (knex) {
  return knex.schema.createTable("items", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned();
    table.foreign("user_id").references("users.id");
    table.string("item_name").notNullable();
    table.text("description");
    table.integer("quantity").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("items");
};