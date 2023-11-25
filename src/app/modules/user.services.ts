import { IUser, TOrder } from './user.interface';
import UserModel from './user.model';

// add user in database
const setUser = async (user: IUser): Promise<IUser | null> => {
  const result = await UserModel.create(user);
  return result;
};
// get all user from database
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
// get single user from database
const getUser = async (userId: string): Promise<IUser | null> => {
  const existsingUser = await UserModel.isUserExists(userId);
  if (!existsingUser) {
    throw new Error('User not found!');
  }
  const result = await UserModel.findOne(
    { userId },
    // todo order
    { password: 0, orders: 0 },
  );
  return result;
};
// update single user
const setSingleUser = async (userId: string, user: IUser) => {
  const existingUser = await UserModel.isUserExists(userId);
  if (!existingUser) {
    throw new Error('User not found!');
  }
  const result = await UserModel.findOneAndUpdate({ userId }, user, {
    new: true,
  }).select('userId username fullName age email isActive hobbies address');
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
// calculate user total order price
const getTotalPrice = async (userId: string) => {
  const existingUser = await UserModel.isUserExists(userId);
  if (!existingUser) {
    throw new Error('User not found!');
  }
  const id = await JSON.parse(userId);
  const result = await UserModel.aggregate([
    // stage-1
    { $match: { userId: id } },
    // stage-2
    { $unwind: '$orders' },
    // stage-3
    {
      $group: {
        _id: '$null',
        total: { $sum: { $multiply: ['$orders.price', '$orders.quantity'] } },
      },
    },
    // stage-4
    {
      $project: {
        totalPrice: { $round: ['$total', 2] },
        _id: 0,
      },
    },
  ]);
  return result.length > 0 ? result[0].totalPrice : 0;
};

export const userServices = {
  setUser,
  getAllUser,
  getUser,
  setSingleUser,
  removeUser,
  addOrder,
  getUserOrders,
  getTotalPrice,
};
