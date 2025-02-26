'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('teachers', [
      {
        dni: '46589132K',
        name: 'Eliseo',
        last_name: 'Larmas',
        date_of_birth: '1985-09-12',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dni: '79899116L',
        name: 'Julieta',
        last_name: 'Santos',
        date_of_birth: '1988-07-28',
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('teachers', null, {});
  },
};
