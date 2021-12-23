'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reservation.belongsTo(models.customer, {foreignKey: "customer_id"});
      Reservation.belongsTo(models.room, {foreignKey: "room_id"});
    }
  };
  Reservation.init({
    starting_date: DataTypes.DATE,
    ending_date: DataTypes.DATE,
    customer_id : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};