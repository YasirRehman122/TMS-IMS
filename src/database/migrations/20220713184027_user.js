/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

    return knex.schema.createTable('USER', table => {
        table.increments("ID");
        table.string("FIRST_NAME", 100);
        table.string("LAST_NAME", 100);
        table.string("EMAIL", 100);
        table.string("CELL_NUMBER", 100);
        table.string("PASSWORD", 256);
        table.string("CNIC", 50);
        table.boolean("IS_PROVIDER");
        table.boolean("ACTIVE_IND");
        table.timestamp('CREATE_DATETIME').defaultTo(knex.fn.now())
        table.timestamp("MODIFIED_DATETIME");
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.dropTable("USER")
  
};
