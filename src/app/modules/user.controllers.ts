import { Request, Response } from 'express';
import { userServices } from './user.services';

// add a new user to the database
const setUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const result = await userServices.setUser(user);
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'User creation Failed',
      error: { code: error.code, description: error.message },
    });
  }
};

// get all the user from database
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUser();
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to fetched Users',
      data: error,
    });
  }
};
// get single user by user id
const getUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getUser(userId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res
      .status(400)
      .json({ success: false, message: 'User not found', data: error });
  }
};

// update a single user information
const setSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = req.body;
    const result = await userServices.setSingleUser(userId, user);
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: { code: 404, description: error.message },
    });
  }
};
// remove user from database
const removeUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.removeUser(userId);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'User not found',
      error: { code: 404, description: error.message },
    });
  }
};

export const userControllers = {
  setUser,
  getAllUser,
  getUser,
  setSingleUser,
  removeUser,
};
