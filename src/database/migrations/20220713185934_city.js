/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {

    return knex.schema.createTable('CITY', table => {
        table.increments("ID");
        table.integer("CITY_NAME", 100);
        table.boolean("ACTIVE_IND");
        table.timestamp('CREATE_DATETIME').defaultTo(knex.fn.now())
        table.timestamp("MODIFIED_DATETIME").defaultTo(knex.fn.now());
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.dropTable("CITY")
  
};
