export const typeDefs = `#graphql
  # Book type with enhanced fields
  type Book {
    id: ID!
    title: String!
    description: String
    publishedYear: Int
    isbn: String
    pages: Int
    rating: Float
    coverUrl: String
    author: Author!
    genres: [Genre!]!
    createdAt: String!
  }

  # Author as a separate entity
  type Author {
    id: ID!
    name: String!
    bio: String
    birthYear: Int
    nationality: String
    books: [Book!]!
  }

  type Genre {
    id: ID!
    name: String!
    description: String
    books: [Book!]!
  }

  input BookFilter {
    authorId: ID
    genreId: ID
    minRating: Float
    minYear: Int
    maxYear: Int
    search: String
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  type BookEdge {
    node: Book!
    cursor: String!
  }

  type BookConnection {
    edges: [BookEdge!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type Query {
    # Get all books with optional filtering and pagination
    books(
      filter: BookFilter
      first: Int = 10
      after: String
    ): BookConnection!
    
    # Get a single book by ID
    book(id: ID!): Book
    
    # Get all authors
    authors: [Author!]!
    
    # Get a single author by ID
    author(id: ID!): Author
    
    # Get all genres
    genres: [Genre!]!
    
    # Search books by title or author
    searchBooks(query: String!): [Book!]!
  }

  input AddBookInput {
    title: String!
    description: String
    publishedYear: Int
    isbn: String
    pages: Int
    authorId: ID!
    genreIds: [ID!]!
    coverUrl: String
  }

  input AddAuthorInput {
    name: String!
    bio: String
    birthYear: Int
    nationality: String
  }

  type AddBookMutationResponse {
    code: String!
    success: Boolean!
    message: String!
    book: Book
  }

  type AddAuthorMutationResponse {
    code: String!
    success: Boolean!
    message: String!
    author: Author
  }

  type Mutation {
    addBook(input: AddBookInput!): AddBookMutationResponse!
    addAuthor(input: AddAuthorInput!): AddAuthorMutationResponse!
    updateBookRating(bookId: ID!, rating: Float!): Book
    deleteBook(id: ID!): Boolean!
  }
`;
