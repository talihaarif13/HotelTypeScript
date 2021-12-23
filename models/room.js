'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      room.hasOne(models.Reservation, {foreignKey: "room_id"});
      room.belongsTo(models.Hotel, {foreignKey:"hotel_id"});
      room.belongsToMany(models.Service, { through: 'RoomService'} );
    }
  };
  room.init({
    status: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'room',
  });
  return room;
};