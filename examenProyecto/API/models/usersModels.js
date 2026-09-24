const { sequelize } = require("../config/db");
const { DataTypes } = require('sequelize');

const users = sequelize.define('Users',{

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    firstName : {
        type: DataTypes.STRING,
        allowNull: false
    },

    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    isDeleted:{
        type: DataTypes.BOOLEAN,
        allowNull:true,      
    },
    likedPosts:{
        type: DataTypes.JSON,
        allowNull: true,
    }
    
},{
    timestamps: false
})

module.exports = users