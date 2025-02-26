const { students } = require('../models');

module.exports = {
  getAllStudents: async () => students.findAll(),

  getStudentById: async (id) => students.findByPk(id),

  createStudent: async (data) => students.create(data),

  updateStudent: async (id, data) => {
    const student = await students.findByPk(id);
    if (!student) return null;
    await student.update(data);
    return student;
  },

  deleteStudent: async (id) => {
    const student = await students.findByPk(id);
    if (!student) return null;
    await student.destroy();
    return true;
  },
};
