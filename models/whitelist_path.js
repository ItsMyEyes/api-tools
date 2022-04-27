const sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	const whitelist_path =  sequelize.define('whitelist_path', {
        id: {
            allowNull: false,
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            validate: {
              notNull: true
            }
        },
        where_url: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        status: {
            allowNull: false,
            type: DataTypes.STRING,
            defaultValue: 'true'
        }
    });

    return whitelist_path;
};