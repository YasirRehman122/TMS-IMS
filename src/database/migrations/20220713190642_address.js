/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {

    return knex.schema.createTable('ADDRESS', table => {
        table.increments("ID");
        table.integer("USER_ID").references("USER.ID");
        table.integer("TOWN_ID").references("TOWN.ID");
        table.string("STREET_INFO", 50);
        table.boolean("ACTIVE_IND");
        table.string("LABEL", 50);
        table.timestamp('CREATE_DATETIME').defaultTo(knex.fn.now())
        table.timestamp("MODIFIED_DATETIME").defaultTo(knex.fn.now());
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.dropTable("ADDRESS")
  
};
