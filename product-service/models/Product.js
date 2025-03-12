const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
});

module.exports = Product;