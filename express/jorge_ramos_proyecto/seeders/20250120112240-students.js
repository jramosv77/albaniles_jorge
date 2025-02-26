'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('students', [
      {
        dni: '16877915R',
        name: 'Alicia',
        last_name: 'Labriego',
        date_of_birth: '2000-02-10',
        teacher_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dni: '42223570Q',
        name: 'Carlos',
        last_name: 'Banega',
        date_of_birth: '2000-11-08',
        teacher_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dni: '79167983H',
        name: 'Charlie',
        last_name: 'Sinewan',
        date_of_birth: '2000-03-22',
        teacher_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dni: '84488643T',
        name: 'Gabriela',
        last_name: 'Hoyos',
        date_of_birth: '2000-04-27',
        teacher_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dni: '22549464B',
        name: 'Rebeca',
        last_name: 'Molina',
        date_of_birth: '2000-12-02',
        teacher_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dni: '39228834J',
        name: 'Roberta',
        last_name: 'Sanjuan',
        date_of_birth: '2000-08-18',
        teacher_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dni: '61122579E',
        name: 'Pau',
        last_name: 'Malpuig',
        date_of_birth: '2000-01-11',
        teacher_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dni: '79144568S',
        name: 'Almudena',
        last_name: 'Torres',
        date_of_birth: '2000-10-13',
        teacher_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('students', null, {});
  },
};
