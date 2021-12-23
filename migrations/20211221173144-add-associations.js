'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     return queryInterface.addColumn(
      'Reservations', // name of Source model
      'customer_id', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'customers', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
    .then(() => {
      // Payment hasOne Order
      return queryInterface.addColumn(
        'Reservations', // name of Target model
        'room_id', // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'rooms', // name of Source model
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      ).then(() => {
        // Order hasMany Product
        return queryInterface.addColumn(
          'rooms', // name of Target model
          'hotel_id', // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'Hotels', // name of Source model
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        );
      });
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return queryInterface.removeColumn(
      'Reservations', // name of the Target model
      'customer_id' // key we want to remove
    ).then(() => {
      // remove Order hasMany Product
      return queryInterface.removeColumn(
        'Reservations', // name of the Target model
        'room_id' // key we want to remove
      ).then(() => {
        // remove Order hasMany Product
        return queryInterface.removeColumn(
          'rooms', // name of the Target model
          'hotel_id' // key we want to remove
        );
      });
    });
  }
};
