import { gql } from "apollo-server-koa";
import { DocumentNode } from "graphql";
import modules from "~/modules";

const rootTypes = gql`
  type PageInfo {
    count: Int
    hasNextPage: Boolean
  }

  type Query {
    # User
    me: User
  }

  type Mutation {
    # User
    signIn(email: String, password: String): AuthOutput
    signUp(email: String, password: String, name: String): AuthOutput
  }
`;

export default [rootTypes, modules.user.type] as DocumentNode[];
