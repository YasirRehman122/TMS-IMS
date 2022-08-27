/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

    return knex.schema.createTable('USER', table => {
        table.increments("ID");
        table.string("FIRST_NAME", 100).notNullable();
        table.string("LAST_NAME", 100).notNullable();
        table.string("EMAIL", 100).unique().notNullable();
        table.string("CELL_NUMBER", 100).notNullable();
        table.string("PASSWORD", 256).notNullable();
        table.boolean("IS_PROVIDER").notNullable();
        table.boolean("ACTIVE_IND").defaultTo(false);
        table.timestamp('CREATE_DATETIME').defaultTo(knex.fn.now())
        table.timestamp("MODIFIED_DATETIME").defaultTo(knex.fn.now());
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.dropTable("USER")
  
};
