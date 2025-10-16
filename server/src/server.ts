import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./schema/typeDefs.js";
import { resolvers } from "./schema/resolvers.js";

// Pour construire l'objet ApolloServer il suffit de lui donner le schéma et les resolvers que l'on a définit préalablement
export const server = new ApolloServer({
  typeDefs,
  resolvers,
});
