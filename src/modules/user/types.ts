import { gql } from "apollo-server-koa";

export default gql`
  type User {
    _id: ID
    name: String
    email: String
    active: Boolean
  }

  type AuthOutput {
    token: String
    user: User
  }

  type UserConnection {
    page: PageInfo
    users: [User]
  }
`;
