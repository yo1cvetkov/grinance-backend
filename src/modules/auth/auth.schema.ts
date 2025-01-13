import z from 'zod';
import { passwordValidationSchema } from 'src/common/common.schema';
import { baseCreateUserSchema } from '../users/user.schema';
import validator from 'validator';

export const registerUserSchema = z
  .object({
    password: passwordValidationSchema('Password'),
    confirmPassword: passwordValidationSchema('Confirm password'),
  })
  .merge(baseCreateUserSchema)
  .strict()
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Passwords must match.',
    path: ['confirmPassword'],
  });

export const loginUserSchema = z.object({
  username: z
    .string({ required_error: 'Username is required' })
    .min(4, 'Username must be at least 4 characters long'),
  password: passwordValidationSchema('Password'),
});

export const changePasswordSchema = z
  .object({
    currentPassword: passwordValidationSchema('Current password'),
    newPassword: passwordValidationSchema('New password'),
  })
  .refine(
    ({ currentPassword, newPassword }) => currentPassword !== newPassword,
    {
      message: 'New password is same as old password',
      path: ['newPassword'],
    }
  );

export const forgetPasswordSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Email must be valid'),
});

export const resetPasswordSchema = z
  .object({
    email: z
      .string({ required_error: 'Email is required' })
      .email('Email must be valid'),
    code: z
      .string({ required_error: 'OTP code is required' })
      .min(4, 'OTP must have 4 digits')
      .max(4, 'OTP must have 4 digits')
      .refine((value) => validator.isAlphanumeric(value), 'OTP must be valid'),
    password: passwordValidationSchema('New password'),
    confirmPassword: passwordValidationSchema('Confirm password'),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type RegisterUserSchemaType = z.infer<typeof registerUserSchema>;
export type LoginUserSchemaType = z.infer<typeof loginUserSchema>;
export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;
export type ForgetPasswordSchemaType = z.infer<typeof forgetPasswordSchema>;
export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
