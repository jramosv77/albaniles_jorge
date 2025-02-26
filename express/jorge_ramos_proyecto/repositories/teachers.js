const { teachers, User, students } = require('../models');

module.exports = {
  getAllTeachers: async () => teachers.findAll(),

  getTeacherById: async (id) => teachers.findByPk(id),

  createTeacher: async (data) => teachers.create(data),

  updateTeacher: async (id, data) => {
    const teacher = await teachers.findByPk(id);
    if (!teacher) return null;
    await teacher.update(data);
    return teacher;
  },

  deleteTeacher: async (id) => {
    // Verificar si el profesor tiene estudiantes asociados
    const associatedStudents = await students.findOne({ where: { teacher_id: id } });

    if (associatedStudents) {
      throw new Error('No se puede borrar el profesor porque tiene estudiantes asociados.');
    }

    // Si no tiene estudiantes asociados, se elimina
    const result = await teachers.destroy({ where: { id } });
    return result;
  },

  getTeacherByUserId: async (userId) => teachers.findOne({
    where: { user_id: userId },
  }),

  getStudentsByTeacher: async (teacherId) => {
    // Verificar si el profesor existe y su usuario asociado está activo
    const teacher = await teachers.findOne({
      where: { id: teacherId },
      include: {
        model: User,
        where: { active: true }, // Filtrar solo si el usuario asociado está activo
      },
    });

    if (!teacher) {
      throw new Error('El profesor no existe o su usuario asociado no está activo.');
    }

    // Obtener todos los estudiantes del profesor ordenados por fecha de nacimiento
    const studentsList = await students.findAll({
      where: { teacher_id: teacherId },
      order: [['date_of_birth', 'ASC']], // Ordenar por fecha de nacimiento ascendente
    });

    return studentsList;
  },

};
