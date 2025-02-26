const express = require('express');
const usersRepository = require('../repositories/users');

const router = express.Router();

// User Endpoints
router.get('/', async (req, res, next) => {
  try {
    const users = await usersRepository.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await usersRepository.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user = await usersRepository.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updatedUser = await usersRepository.updateUser(req.params.id, req.body);
    if (!updatedUser) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await usersRepository.deleteUser(req.params.id);
    if (!result) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json({ message: 'Usuario borrado' });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/active', async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await usersRepository.activateUser(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(user); // Devolver el usuario actualizado
  } catch (error) {
    next(error);
  }
});

router.get('/:id/active', async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await usersRepository.getActiveStatus(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ active: user.active }); // Devolver solo el campo active
  } catch (error) {
    next(error);
  }
});

module.exports = router;
