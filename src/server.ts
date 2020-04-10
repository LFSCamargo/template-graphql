import koa from "koa";
import mongoose from "mongoose";
import { ApolloServer, PubSub } from "apollo-server-koa";
import graphql from "~/graphql";
import { MONGO_URL, PORT } from "./config";
import { getUser } from "~/utils";

const app = new koa();
const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs: graphql.types,
  resolvers: graphql.resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization ? req.headers.authorization : "";
    return {
      user: token !== "" ? await getUser(token) : null,
      pubsub,
    };
  },
});

server.applyMiddleware({ app });

mongoose.connect(MONGO_URL, {}, (err) => {
  if (err) {
    console.log("⚡️ MONGO CONNECTION ERROR", err);
    process.exit(1);
  }
  console.log(`⚡️ Connected to mongo ${MONGO_URL}`);

  app.listen({ port: PORT }, () =>
    console.log(
      `🚀 GraphQL Server ready at http://localhost:4000${server.graphqlPath}`
    )
  );
});
