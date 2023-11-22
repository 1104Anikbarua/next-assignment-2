import { Schema } from 'mongoose';
import IUser, { TAddress, TFullName, TOrder } from './user.interface';

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

const userSchema = new Schema<IUser>({
  userId: { type: Number, required: true, unique: true },
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: {
    type: fullNameSchema,
    required: true,
  },
  age: { type: Number, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: [String],
  address: {
    type: addressSchema,
    required: true,
  },

  orders: [{ orderSchema, required: true }],
});
export default userSchema;
