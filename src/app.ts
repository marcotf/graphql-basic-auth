require("dotenv").config();
import { ApolloServer } from "apollo-server";
import schema from "./schemas";

const server = new ApolloServer({ schema, context: ({ req }) => ({ headers: req.headers }) });

server.listen({ port: process.env.PORT || 3000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
