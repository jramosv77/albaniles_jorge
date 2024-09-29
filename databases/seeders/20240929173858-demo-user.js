"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        firstName: "Michael",
        lastName: "Johnson",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        firstName: "Emily",
        lastName: "Williams",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        firstName: "David",
        lastName: "Brown",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};