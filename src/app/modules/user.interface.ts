import { Model } from 'mongoose';

export type TFullName = {
  firstName: string;
  lastName: string;
};
export type TAddress = {
  street: string;
  city: string;
  country: string;
};
export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};

export interface IUser {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: number;
  isActive: boolean;
  hobbies: Array<string>;
  address: TAddress;
  orders?: Array<TOrder>;
}

export interface IUserMethod extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(userId: string): Promise<IUser | null>;
}
