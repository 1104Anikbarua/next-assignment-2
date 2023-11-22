import { Schema } from 'mongoose';
import IUser from './user.interface';

const userSchema = new Schema<IUser>({
  userId: { type: Number, required: true, unique: true },
});
