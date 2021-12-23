'use strict';

const { sequelize } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     return queryInterface.addColumn('Hotels', 'name', { 
        type: Sequelize.STRING 
      }).then(()=>{
        return queryInterface.addConstraint('Hotels', {
          fields: ['name'],
          type: 'unique',
          name:'unique_hotel_name'
        })
      }).then(() => {
        return queryInterface.addConstraint('customers', {
          fields: ['email'],
          type: 'unique',
          name:'unique_customer_email'
        })
      });
      
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
