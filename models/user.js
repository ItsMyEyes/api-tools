const sequelize = require('sequelize');
const { user } = require('tiktok-scraper');

module.exports = (sequelize, DataTypes) => {
	const users =  sequelize.define('users', {
        id: {
            allowNull: false,
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            validate: {
              notNull: true
            }
        },
        username: {
          allowNull: false,
          type: DataTypes.STRING,
          unique: true
        },
        name: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        email: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        verification: {
          allowNull: false,
          type: DataTypes.STRING,
          defaultValue: 'false'
        },
        password: {
          allowNull: false,
          type: DataTypes.TEXT,
        },
        role: {
          allowNull: false,
          type: DataTypes.STRING,
          defaultValue: 'user'
        },
    });

    users.associate = models => {
        users.hasMany(models.logs, { as: 'logging', foreignKey: 'id_user' })
        users.hasMany(models.whitelist_user, { as: 'whitelist', foreignKey: 'id_user' })
    }

    return users;
};