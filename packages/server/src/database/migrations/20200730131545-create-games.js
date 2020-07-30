'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('games', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      apiKey: {
        type: Sequelize.UUIDV4,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'users',
            schema: 'schema'
          },
          key: 'id'
        }
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('games')
  }
}
