import { Request, Response } from 'express';
import { userServices } from './user.services';
import { orderSchema, zodSchema } from './user.validation';
import { z } from 'zod';

// add a new user to the database
const setUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const outcome = zodSchema.parse(user);
    const result = await userServices.setUser(outcome);
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(404).json({
        success: false,
        message: 'User creation failed',
        error: {
          code: error.issues[0].code,
          description: error.issues[0].message,
        },
      });
    } else if (error instanceof Error) {
      res.status(404).json({
        success: false,
        message: 'User creation failed',
        error: { code: error.name, description: error.message },
      });
    }
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({
        success: false,
        message: 'Failed to fetched Users',
        data: error,
      });
    }
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: { code: 404, description: error.message },
      });
    }
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
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: error.issues[0].code,
          description: error.issues[0].message,
        },
      });
    } else if (error instanceof Error) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: error.message,
        },
      });
    }
  }
};
// remove user from database
const removeUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await userServices.removeUser(userId);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: { code: 404, description: error.message },
      });
    }
  }
};
// set user order
const addOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const order = req.body;
    const outcome = orderSchema.parse(order);
    await userServices.addOrder(userId, outcome);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: { code: 404, description: error.message },
      });
    }
  }
};
//get user orders
const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getUserOrders(userId);
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully',
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: { code: 404, description: error.message },
      });
    }
  }
};
// calculate total price
const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getTotalPrice(userId);
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully',
      data: { result },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: { code: 404, description: error.message },
      });
    }
  }
};

export const userControllers = {
  setUser,
  getAllUser,
  getUser,
  setSingleUser,
  removeUser,
  addOrder,
  getUserOrders,
  getTotalPrice,
};
