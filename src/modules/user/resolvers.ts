import { ResolverType, GraphQLContext } from "@types";
import { Constants, encryptPassword, signJWT, authenticate } from "~/utils";
import User from "./model";

interface SignInArgs {
  name?: string;
  password: string;
  email: string;
}

export default {
  Query: {
    me: async (_root: any, _args: any, { user }: GraphQLContext) => {
      if (!user) {
        throw Error(Constants.errors.notLogged);
      }

      return {
        user: await User.findOne({ _id: user._id }),
      };
    },
  },
  Mutation: {
    signIn: async (
      _root: any,
      { email, password }: SignInArgs,
      _context?: GraphQLContext
    ) => {
      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        throw new Error(Constants.errors.wrongPasswordOrEmail);
      }

      const isPasswordCorrect = authenticate(password, user.password);

      if (!isPasswordCorrect) {
        throw new Error(Constants.errors.wrongPasswordOrEmail);
      }

      const token = `JWT ${signJWT(email)}`;

      return {
        token,
        user: await User.findOne({ _id: user._id }),
      };
    },
    signUp: async (
      _root: any,
      { name, email, password }: SignInArgs,
      _context?: GraphQLContext
    ) => {
      const user = await User.findOne({ email });

      if (user) {
        throw new Error("This email is already in use");
      }

      const newUser = new User({
        name,
        password: encryptPassword(password),
        email,
      });

      await newUser.save();

      const token = `JWT ${signJWT(email)}`;

      return {
        token,
        user: await User.findOne({ _id: newUser._id }),
      };
    },
  },
} as ResolverType;
