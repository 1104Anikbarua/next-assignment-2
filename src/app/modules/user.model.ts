import { model } from 'mongoose';
import { IUser, IUserMethod } from './user.interface';
import userSchema from './user.schema';

const UserModel = model<IUser, IUserMethod>('User', userSchema);

export default UserModel;
