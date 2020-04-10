import { ResolverType } from "@types";
import modules from "~/modules";

export default {
  Query: {
    ...modules.user.resolver.Query,
  },
  Mutation: {
    ...modules.user.resolver.Mutation,
  },
} as ResolverType;
