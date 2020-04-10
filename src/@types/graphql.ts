import { PubSub } from "apollo-server-koa";
import { User } from "../modules/user/model";

export interface ResolverType {
  Query?: {
    [query: string]: any;
  };
  Mutation?: {
    [mutation: string]: any;
  };
  Subscription?: {
    [subscription: string]: any;
  };
  [type: string]: any;
}

export interface GraphQLContext {
  user: User | null;
  pubsub: PubSub;
}
