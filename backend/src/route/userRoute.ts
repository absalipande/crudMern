import express from 'express';
import {
  getAllUsers,
  getUserById,
  postUser,
  updateUser,
  deleteUser,
} from '../controller/userController';

const router = express.Router();

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users/', postUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
