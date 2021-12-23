'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      customer.hasMany(models.Reservation, {foreignKey: "customer_id"});
    }
  };
  customer.init({
    name: DataTypes.STRING,
    email: DataTypes.TEXT,
    password: DataTypes.STRING,
    address: DataTypes.TEXT,
    phone: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'customer',
  });
  return customer;
};