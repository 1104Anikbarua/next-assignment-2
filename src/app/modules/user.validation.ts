import { z } from 'zod';

export const orderSchema = z.object({
  productName: z
    .string({
      required_error: 'Product name is required',
      invalid_type_error: 'Product name must be a string',
    })
    .min(1, { message: 'Product name is too short' })
    .max(30, { message: 'Product name is too long' })
    .trim(),
  price: z
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    })
    .positive({ message: 'Price must be a positive number' }),
  quantity: z
    .number({
      required_error: 'Quantity is required',
      invalid_type_error: 'Quantity must be a number',
    })
    .positive({ message: 'Quantity must be a positive number' })
    .min(1, { message: 'Quantity must be define' }),
});
export const zodSchema = z.object({
  userId: z
    .number({
      required_error: 'User id is required',
      invalid_type_error: 'User id must be a number',
    })
    .int()
    .positive()
    .safe(),

  username: z
    .string({
      required_error: 'User name is required',
      invalid_type_error: 'User name must be a string',
    })
    .min(1)
    .trim(),

  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(8, { message: 'Password must be 8 characters long' })
    .max(16, { message: 'Password must not more than 16 charaters long' })
    .trim(),

  fullName: z
    .object({
      firstName: z
        .string({
          required_error: 'First name is required',
          invalid_type_error: 'First name must be string',
        })
        .min(1, { message: 'First name is too short' })
        .max(20, { message: 'First name is too long' })
        .trim()
        .refine((value) => /^[A-Za-z]+$/.test(value), {
          message: 'First name should contain only alphabets',
        }),
      lastName: z
        .string({
          required_error: 'First name is required',
          invalid_type_error: 'First name must be string',
        })
        .min(1, { message: 'Last name is too short' })
        .max(20, { message: 'Last name is too long' })
        .trim()
        .refine((value) => /^[A-Za-z]+$/.test(value), {
          message: 'Last name should contain only alphabets',
        }),
    })
    .required(),

  age: z
    .number({
      required_error: 'Age is required',
      invalid_type_error: 'Age must be a number',
    })
    .safe()
    .positive({ message: 'Age must be a positive number' })
    .min(1, { message: 'Minimum age is 1' })
    .max(200, { message: 'Age is too long' }),

  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be string',
    })
    .email()
    .trim(),
  isActive: z.boolean({
    required_error: 'isActive is required',
    invalid_type_error: 'isActive must be a true or false',
  }),

  hobbies: z.string().array().nonempty({ message: 'Hobbies cannot be empty' }),

  address: z
    .object({
      street: z
        .string({
          required_error: 'Street is required',
          invalid_type_error: 'Street name must be a string',
        })
        .min(1, { message: 'Street name is too short' })
        .max(20, { message: 'Street name is too long' })
        .trim(),

      city: z
        .string({
          required_error: 'City is required',
          invalid_type_error: 'City name must be a string',
        })
        .min(1, { message: 'City name is too short' })
        .max(20, { message: 'City name is too long' })
        .trim(),
      country: z
        .string({
          required_error: 'Country is required',
          invalid_type_error: 'Country name must be a string',
        })
        .min(1, { message: 'Country name is too short' })
        .trim(),
    })
    .required(),
  orders: z.array(orderSchema).default([]),
});
