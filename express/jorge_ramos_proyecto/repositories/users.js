const { User, teachers } = require('../models');

module.exports = {
  getAllUsers: async () => User.findAll(),

  getUserById: async (id) => User.findByPk(id),

  createUser: async (data) => User.create(data),

  updateUser: async (id, data) => {
    const usuario = await User.findByPk(id);
    if (!usuario) return null;
    await usuario.update(data);
    return usuario;
  },

  deleteUser: async (id) => {
    // Verificar si el usuario tiene un profesor asociado
    const associatedTeacher = await teachers.findOne({ where: { user_id: id } });

    if (associatedTeacher) {
      throw new Error('No se puede borrar el usuario porque tiene un profesor asociado.');
    }

    // Si no tiene profesor asociado, se elimina
    const result = await User.destroy({ where: { id } });
    return result;
  },

  // Obtener el campo active de un usuario
  getActiveStatus: async (userId) => {
    const user = await User.findByPk(userId, {
      attributes: ['active'], // Solo traer el campo active
    });
    return user; // Devuelve el usuario o null si no existe
  },

  // Actualizar el campo active a true (también valida si el usuario existe)
  activateUser: async (userId) => {
    const user = await User.findByPk(userId); // Buscar el usuario por ID
    if (!user) return null; // Si no existe, devolver null

    user.active = true;
    await user.save(); // Guardar los cambios en la base de datos
    return user;
  },

  getUserByEmail: async (email) => User.findOne({ where: { email } }),

};
