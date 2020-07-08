import { loadFilesSync, makeExecutableSchema, mergeTypeDefs, mergeResolvers } from "graphql-tools";
import directives from "../directives";

const typesArray = loadFilesSync(`${__dirname}/**/*.graphql`);
const resolversArray = loadFilesSync(`${__dirname}/**/resolvers.ts`);

console.log("✅ ", typesArray.length, "types loaded");
console.log("✅ ", resolversArray.length, "resolvers loaded");

// Return a working schema for Apollo
export default makeExecutableSchema({
  typeDefs: mergeTypeDefs(typesArray),
  resolvers: mergeResolvers(resolversArray),
  directiveResolvers: directives,
});
