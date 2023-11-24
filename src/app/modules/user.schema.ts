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
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: {
    type: fullNameSchema,
    required: true,
    _id: false,
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: [{ type: String, required: true }],
  address: {
    type: addressSchema,
    required: true,
    _id: false,
  },

  orders: { type: [orderSchema], default: [], _id: false },
});

// create index
// userSchema.index({ userId: 1 }, { unique: true });
// userSchema.index({ username: 1 }, { unique: true });

// static method
userSchema.statics.isUserExists = async function (userId: string) {
  const existingUser = await UserModel.findOne({ userId });
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
userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.password;
    // delete ret.orders;
    delete ret.__v;
    // return ret;
  },
});

// userSchema.post('save', async function (doc, next) {
//   console.log(doc);
//   const user = doc;
//   user.toObject();
//   delete user.password;
//   doc.password = undefined;
//   doc.orders = undefined;
//   next();
// });

export default userSchema;
