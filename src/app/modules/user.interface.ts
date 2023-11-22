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
  userName: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: number;
  isActive: boolean;
  hobbies: Array<string>;
  address: TAddress;
  orders: Array<TOrder>;
}

export default IUser;
