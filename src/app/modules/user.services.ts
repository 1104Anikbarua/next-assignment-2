import { IUser } from './user.interface';
import UserModel from './user.model';

const setUser = async (user: IUser) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUser = async () => {
  const result = await UserModel.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1, _id: 0 },
  );
  return result;
};

const getUser = async (userId: string) => {
  const existsingUser = await UserModel.isUserExists(userId);
  if (!existsingUser) {
    throw new Error('User already exists');
  }
  const result = await UserModel.findOne({ userId }, { password: 0 });
  return result;
};

export const userServices = {
  setUser,
  getAllUser,
  getUser,
};
