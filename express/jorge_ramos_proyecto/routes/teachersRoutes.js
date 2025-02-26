const express = require('express');
const teachersRepository = require('../repositories/teachers');

const router = express.Router();

// Teacher Endpoints
router.get('/', async (req, res, next) => {
  try {
    const teachers = await teachersRepository.getAllTeachers();
    res.status(200).json(teachers);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const teacher = await teachersRepository.getTeacherById(req.params.id);
    if (!teacher) return res.status(404).json({ message: 'Profesor no encontrado' });
    res.status(200).json(teacher);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const teacher = await teachersRepository.createTeacher(req.body);
    res.status(201).json(teacher);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updatedTeacher = await teachersRepository.updateTeacher(req.params.id, req.body);
    if (!updatedTeacher) return res.status(404).json({ message: 'Profesor no encontrado' });
    res.status(200).json(updatedTeacher);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await teachersRepository.deleteTeacher(req.params.id);
    if (!result) return res.status(404).json({ message: 'Profesor no encontrado' });
    res.status(200).json({ message: 'Profesor borrado' });
  } catch (error) {
    next(error);
  }
});

router.get('/:teacher_id/students', async (req, res, next) => {
  const { teacher_id } = req.params;

  try {
    // Llamar al repositorio para obtener los estudiantes del profesor
    const students = await teachersRepository.getStudentsByTeacher(teacher_id);

    res.status(200).json(students); // Devolver la lista de estudiantes
  } catch (error) {
    if (error.message === 'El profesor no existe o su usuario asociado no está activo.') {
      return res.status(401).json({ error: error.message }); // Usuario no autorizado
    }

    // Manejar cualquier otro error
    next(error);
  }
});

module.exports = router;
