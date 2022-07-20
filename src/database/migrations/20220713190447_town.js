/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {

    return knex.schema.createTable('TOWN', table => {
        table.increments("ID");
        table.integer("CITY_ID").references("CITY.ID");
        table.string("TOWN_NAME", 50);
        table.timestamp('CREATE_DATETIME').defaultTo(knex.fn.now())
        table.timestamp("MODIFIED_DATETIME").defaultTo(knex.fn.now());
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.dropTable("TOWN")
  
};
