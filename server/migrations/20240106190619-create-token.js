'use strict';
/** @type {import('sequelize-cli').Migration} */
const up = async function(queryInterface, Sequelize) {
  await queryInterface.createTable('Tokens', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Assuming your User model is named 'Users'
        key: 'id',
      },
    },
    token: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
}
const down = async function(queryInterface, Sequelize) {
  await queryInterface.dropTable('Tokens');
}

module.exports = {
  up,
  down
}