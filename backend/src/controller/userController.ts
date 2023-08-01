import { Request, Response } from 'express';
import User, { IUser } from '../model/userSchema';
import { v4 as uuidv4 } from 'uuid';

interface AuthenticatedRequest extends Request {
  user?: IUser;
}

// GET all /users
export const getAllUsers = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users.' });
  }
};

// GET individual /users/:id
export const getUserById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = await User.findById(req.params.id);
    if (!userId) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json(userId);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user.' });
  }
};

// POST /users/
export const postUser = async (req: AuthenticatedRequest, res: Response) => {
  const { name, age, email, gender } = req.body;
  const deleteToken = uuidv4();
  const user = new User({ name, age, email, gender, deleteToken });

  try {
    const listedUser = await user.save();
    res.status(201).json({ user: listedUser });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to create user.' });
  }
};

// PATCH /users/:id
export const updateUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update user.' });
  }
};

// DELETE /users/:id
export const deleteUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userDeleteToken = req.body.deleteToken;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (user.deleteToken === userDeleteToken) {
      await User.deleteOne({ _id: id });
      return res.status(200).json({ message: 'User deleted successfully.' });
    } else {
      return res
        .status(403)
        .json({ message: 'You do not have permission to delete this user.' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete the user.' });
  }
};
