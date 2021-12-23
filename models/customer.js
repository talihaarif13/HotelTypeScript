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
    email: {
      type : DataTypes.TEXT,
      validate : {
        isEmail : true
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull:false,
      validate:{
        len: [5,100]
      }
    },
    address: DataTypes.TEXT,
    phone: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'customer',
  });
  return customer;
};