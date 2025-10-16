import { books } from "../data/books.js";

// Résolveur qui permet de dire où chercher les types définit dans le schéma,
// ici pas encore de base de donnée donc on met notre tableau books
export const resolvers = {
  Query: {
    books: () => books,
  },
};
