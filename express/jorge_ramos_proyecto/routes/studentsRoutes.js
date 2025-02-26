const express = require('express');
const studentsRepository = require('../repositories/students');

const router = express.Router();

// Student Endpoints
router.get('/', async (req, res, next) => {
  try {
    const students = await studentsRepository.getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const student = await studentsRepository.getStudentById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Estudiante no encontrado' });
    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const student = await studentsRepository.createStudent(req.body);
    res.status(201).json(student);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updatedStudent = await studentsRepository.updateStudent(req.params.id, req.body);
    if (!updatedStudent) return res.status(404).json({ message: 'Estudiante no encontrado' });
    res.status(200).json(updatedStudent);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await studentsRepository.deleteStudent(req.params.id);
    if (!result) return res.status(404).json({ message: 'Estudiante no encontrado' });
    res.status(200).json({ message: 'Estudiante borrado' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
