import {
  books,
  authors,
  genres,
  getBookById,
  getAuthorById,
  getGenreById,
  getBooksByAuthor,
  getBooksByGenre,
  Book,
} from "../data/books.js";

// Helper function for pagination
const paginateBooks = (
  allBooks: Book[],
  first: number = 10,
  after?: string
) => {
  let startIndex = 0;
  if (after) {
    const afterIndex = allBooks.findIndex((book) => book.id === after);
    startIndex = afterIndex >= 0 ? afterIndex + 1 : 0;
  }

  const endIndex = startIndex + first;
  const paginatedBooks = allBooks.slice(startIndex, endIndex);

  return {
    edges: paginatedBooks.map((book, index) => ({
      node: book,
      cursor: book.id,
    })),
    pageInfo: {
      hasNextPage: endIndex < allBooks.length,
      hasPreviousPage: startIndex > 0,
      startCursor: paginatedBooks[0]?.id,
      endCursor: paginatedBooks[paginatedBooks.length - 1]?.id,
    },
    totalCount: allBooks.length,
  };
};

// Filter books based on criteria
const filterBooks = (filter: any) => {
  let filteredBooks = [...books];

  if (filter?.authorId) {
    filteredBooks = filteredBooks.filter(
      (book) => book.authorId === filter.authorId
    );
  }

  if (filter?.genreId) {
    filteredBooks = filteredBooks.filter((book) =>
      book.genreIds.includes(filter.genreId)
    );
  }

  if (filter?.minRating) {
    filteredBooks = filteredBooks.filter(
      (book) => (book.rating || 0) >= filter.minRating
    );
  }

  if (filter?.minYear) {
    filteredBooks = filteredBooks.filter(
      (book) => (book.publishedYear || 0) >= filter.minYear
    );
  }

  if (filter?.maxYear) {
    filteredBooks = filteredBooks.filter(
      (book) => (book.publishedYear || 0) <= filter.maxYear
    );
  }

  if (filter?.search) {
    const searchTerm = filter.search.toLowerCase();
    filteredBooks = filteredBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm) ||
        getAuthorById(book.authorId)?.name.toLowerCase().includes(searchTerm)
    );
  }

  return filteredBooks;
};

export const resolvers = {
  Query: {
    books: (_parent: any, args: any) => {
      const filteredBooks = args.filter ? filterBooks(args.filter) : books;
      return paginateBooks(filteredBooks, args.first, args.after);
    },

    book: (_parent: any, args: { id: string }) => {
      return getBookById(args.id);
    },

    authors: () => authors,

    author: (_parent: any, args: { id: string }) => {
      return getAuthorById(args.id);
    },

    genres: () => genres,

    searchBooks: (_parent: any, args: { query: string }) => {
      const searchTerm = args.query.toLowerCase();
      return books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm) ||
          getAuthorById(book.authorId)?.name.toLowerCase().includes(searchTerm)
      );
    },
  },

  // Resolvers for Book type
  Book: {
    author: (parent: Book) => {
      return getAuthorById(parent.authorId);
    },

    genres: (parent: Book) => {
      return parent.genreIds.map((id) => getGenreById(id)).filter(Boolean);
    },
  },

  // Resolvers for Author type
  Author: {
    books: (parent: any) => {
      return getBooksByAuthor(parent.id);
    },
  },

  // Resolvers for Genre type
  Genre: {
    books: (parent: any) => {
      return getBooksByGenre(parent.id);
    },
  },

  Mutation: {
    addBook: (_parent: any, args: { input: any }) => {
      const newBook: Book = {
        id: (books.length + 1).toString(),
        ...args.input,
        createdAt: new Date().toISOString(),
      };

      books.push(newBook);

      return {
        code: "200",
        success: true,
        message: "Book added successfully",
        book: newBook,
      };
    },

    addAuthor: (_parent: any, args: { input: any }) => {
      const newAuthor = {
        id: (authors.length + 1).toString(),
        ...args.input,
      };

      authors.push(newAuthor);

      return {
        code: "200",
        success: true,
        message: "Author added successfully",
        author: newAuthor,
      };
    },

    updateBookRating: (
      _parent: any,
      args: { bookId: string; rating: number }
    ) => {
      const book = getBookById(args.bookId);
      if (book) {
        book.rating = args.rating;
        return book;
      }
      return null;
    },

    deleteBook: (_parent: any, args: { id: string }) => {
      const index = books.findIndex((book) => book.id === args.id);
      if (index > -1) {
        books.splice(index, 1);
        return true;
      }
      return false;
    },
  },
};
