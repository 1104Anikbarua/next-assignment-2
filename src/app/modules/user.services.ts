import config from '../config';
import { IUser, TOrder } from './user.interface';
import UserModel from './user.model';
import bcrypt from 'bcrypt';

const setUser = async (user: IUser): Promise<IUser | null> => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUser = async () => {
  const result = await UserModel.find(
    {},
    {
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      address: 1,
      _id: 0,
    },
  );
  return result;
};

const getUser = async (userId: string): Promise<IUser | null> => {
  const existsingUser = await UserModel.isUserExists(userId);
  if (!existsingUser) {
    throw new Error('User already exists');
  }
  const result = await UserModel.findOne({ userId }, { password: 0 });
  return result;
};
// update single user
const setSingleUser = async (userId: string, user: IUser) => {
  const existingUser = await UserModel.isUserExists(userId);
  if (!existingUser) {
    throw new Error('User not found!');
  }

  user.password = await bcrypt.hash(
    user.password,
    Number(config.password_hash),
  );
  const result = await UserModel.findOneAndUpdate(
    { userId },
    { $set: user },
    { new: true, runValidators: true },
  ).select('userId username fullName age email isActive hobbies address');
  return result;
};

// remove a user from database
const removeUser = async (userId: string) => {
  const existingUser = await UserModel.isUserExists(userId);
  if (!existingUser) {
    throw new Error('User not found!');
  }
  const result = await UserModel.deleteOne({ userId });
  return result;
};

//user add order
const addOrder = async (userId: string, orders: TOrder) => {
  // console.log('hit at order route ', userId, order);
  const existingUser = await UserModel.isUserExists(userId);
  if (!existingUser) {
    throw new Error('User not found!');
  }
  const result = await UserModel.updateOne(
    { userId },
    { $push: { orders: orders } },
    { upsert: true },
  );
  return result;
};
// get user order
const getUserOrders = async (userId: string) => {
  const existingUser = await UserModel.isUserExists(userId);
  if (!existingUser) {
    throw new Error('User not found!');
  }
  const result = await UserModel.findOne({ userId }, { _id: 0, orders: 1 });
  return result;
};

export const userServices = {
  setUser,
  getAllUser,
  getUser,
  setSingleUser,
  removeUser,
  addOrder,
  getUserOrders,
};
