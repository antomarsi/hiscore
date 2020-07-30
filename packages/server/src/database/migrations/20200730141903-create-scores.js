'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('scores', {
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
      score: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      gameId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'games',
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
    return await queryInterface.dropTable('scores')
  }
}
