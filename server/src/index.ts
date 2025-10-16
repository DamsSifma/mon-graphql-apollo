import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

// Dataset de test
const books = [
  {
    title: "Le Seigneur des Anneaux",
    author: "J.R.R. Tolkien",
  },
  {
    title: "L'Étranger",
    author: "Albert Camus",
  },
];

// Résolveur qui permet de dire où chercher les types définit dans le schéma, ici pas encore de base de donnée donc on met notre tableau books

const resolvers = {
  Query: {
    books: () => books,
  },
};

// Pour construire l'objet ApolloServer il suffit de lui donner le schéma et les resolvers que l'on a définit préalablement
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Permet de créer le serveur qui va écouter les requêtes qu'on a définit (ici juste pour obtenir les livres)
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);
