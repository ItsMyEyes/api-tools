const sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	const logs =  sequelize.define('logs', {
        id: {
            allowNull: false,
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            validate: {
              notNull: true
            }
        },
        doing: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        ip_client: {
            allowNull: false,
            type: DataTypes.STRING
        },
        url: {
          allowNull: false,
          type: DataTypes.STRING
        },
        status: {
            allowNull: false,
            type: DataTypes.STRING
        },
        request: {
          allowNull: false,
          type: DataTypes.TEXT
        }
    });

    return logs;
};