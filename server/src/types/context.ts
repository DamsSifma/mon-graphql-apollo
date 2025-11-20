import { Book, Author, Genre } from "../data/books.js";

// Context interface for Apollo Server
export interface MyContext {
  dataSources: {
    books: Book[];
    authors: Author[];
    genres: Genre[];
  };
}

// You can add more context types here as your app grows
export interface DataSources {
  books: Book[];
  authors: Author[];
  genres: Genre[];
}
