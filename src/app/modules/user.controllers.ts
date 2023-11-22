import { Request, Response } from 'express';
import { userServices } from './user.services';

const setUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const result = await userServices.setUser(user);
    res.status(200).json({
      success: true,
      message: 'User Created Successfully',
      data: result,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: 'User Creation Failed', error: error });
  }
};

export const userControllers = {
  setUser,
};
