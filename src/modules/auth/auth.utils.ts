import bcrypt from 'bcrypt';

export const hashPassword = async (plainPassword: string): Promise<string> => {
  return await bcrypt.hash(plainPassword, 10);
};
