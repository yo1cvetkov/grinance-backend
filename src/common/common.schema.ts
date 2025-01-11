import * as z from 'zod';
import validator from 'validator';

export const passwordValidationSchema = (fieldName: string) =>
  z
    .string({ required_error: `${fieldName} is required` })
    .min(8)
    .max(64)
    .refine(
      (value) =>
        validator.isStrongPassword(value, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        }),
      'Password is too weak'
    );

export const isAdultSchema = (fieldName: string) =>
  z.string({ required_error: `${fieldName} is required` }).refine(
    (value) => {
      const date = new Date(value);
      const today = new Date();

      const age = today.getFullYear() - date.getFullYear();

      const hadBirthdayThisYear =
        today.getMonth() > date.getMonth() ||
        (today.getMonth() === date.getMonth() &&
          today.getDate() >= date.getDate());

      return age > 18 || (age === 18 && hadBirthdayThisYear);
    },
    {
      message: 'You must be at least 18 years old.',
    }
  );

export const isDateNotInFuture = (fieldName: string) =>
  z.string({ required_error: `${fieldName} is required` }).refine(
    (value) => {
      const date = new Date(value);

      const today = new Date();

      return date <= today;
    },
    {
      message: 'Date cannot be in the future.',
    }
  );
