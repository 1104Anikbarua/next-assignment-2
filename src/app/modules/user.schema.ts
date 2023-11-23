import { Schema } from 'mongoose';
import {
  IUser,
  IUserMethod,
  TAddress,
  TFullName,
  TOrder,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../config';
import UserModel from './user.model';

const fullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const addressSchema = new Schema<TAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const orderSchema = new Schema<TOrder>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<IUser, IUserMethod>({
  userId: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: {
    type: fullNameSchema,
    required: true,
  },
  age: { type: Number, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: [{ type: String, required: true }],
  address: {
    type: addressSchema,
    required: true,
  },

  orders: [{ orderSchema }],
});

// create index
// userSchema.index({ userId: 1, username: 1 }, { unique: true });

// static method
userSchema.statics.isUserExists = async function (userId: string) {
  console.log('who called after first =>schema');
  const existingUser = await UserModel.findOne({ userId });
  console.log(existingUser);
  return existingUser !== null;
};

// middleware
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.password_hash),
  );
  next();
});
userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

export default userSchema;
