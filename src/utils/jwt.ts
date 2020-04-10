import jwt from "jsonwebtoken";
import { User } from "@types";
import { JWT } from "~/config";
import userModel from "../modules/user/model";

export const signJWT = (id: string) => jwt.sign({ id }, JWT);

export const getUser = async (token: string): Promise<User | null> => {
  if (!token) {
    return null;
  }

  try {
    const decodedToken: any = jwt.verify(token.substring(4), JWT);

    const user = await userModel.findOne({ email: decodedToken.id });

    return user;
  } catch (err) {
    return null;
  }
};
