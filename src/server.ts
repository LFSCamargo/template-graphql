import koa from "koa";
import mongoose from "mongoose";
import { ApolloServer, PubSub } from "apollo-server-koa";
import graphql from "~/graphql";
import { MONGO_URL, PORT } from "~/config";
import { getUser, logRequest } from "~/utils";

const app = new koa();
const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs: graphql.types,
  resolvers: graphql.resolvers,
  context: async ({ ctx }) => {
    const { request } = ctx;

    logRequest(request);

    const token = request.header.authorization
      ? request.header.authorization
      : "";

    return {
      user: await getUser(token),
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
      `🚀 server ready at http://localhost:${PORT}/${server.graphqlPath}`
    )
  );
});
