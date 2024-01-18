"use strict";
/** @type {import('sequelize-cli').Migration} */
const up = async function(queryInterface, Sequelize) {
  await queryInterface.createTable("Users", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    provider: {
      type: Sequelize.STRING,
      defaultValue: "custom",
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });
}

const down = async function(queryInterface, Sequelize) {
  await queryInterface.dropTable("Users");
}

module.exports = {
  up,
  down
};