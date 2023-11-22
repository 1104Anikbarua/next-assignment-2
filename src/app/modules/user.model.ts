import { model } from 'mongoose';
import IUser from './user.interface';
import userSchema from './user.schema';

const UserModel = model<IUser>('User', userSchema);

export default UserModel;
