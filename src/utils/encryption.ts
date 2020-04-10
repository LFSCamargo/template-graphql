import * as bcrypt from "bcryptjs";

export const authenticate = (plainPassword: string, hash: string): boolean =>
  bcrypt.compareSync(plainPassword, hash);

export const encryptPassword = (plainPassword: string): string =>
  bcrypt.hashSync(plainPassword, 8);
