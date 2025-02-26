'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword1 = await bcrypt.hash('contrasenausuario', 10);
    const hashedPassword2 = await bcrypt.hash('contrasenaadmin', 10);

    await queryInterface.bulkInsert('Users', [
      {
        email: 'admin@ejemplo.com',
        password: hashedPassword2,
        type: 'admin',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'usuario1@ejemplo.com',
        password: hashedPassword1,
        type: 'user',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'usuario2@ejemplo.com',
        password: hashedPassword1,
        type: 'user',
        active: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
