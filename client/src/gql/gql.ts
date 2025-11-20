/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetBooksEnhanced($filter: BookFilter, $first: Int, $after: String) {\n    books(filter: $filter, first: $first, after: $after) {\n      edges {\n        node {\n          id\n          title\n          description\n          publishedYear\n          isbn\n          pages\n          rating\n          coverUrl\n          createdAt\n          author {\n            id\n            name\n            bio\n            birthYear\n            nationality\n          }\n          genres {\n            id\n            name\n            description\n          }\n        }\n        cursor\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      totalCount\n    }\n  }\n": typeof types.GetBooksEnhancedDocument,
    "\n  query GetBookDetails($id: ID!) {\n    book(id: $id) {\n      id\n      title\n      description\n      publishedYear\n      isbn\n      pages\n      rating\n      coverUrl\n      createdAt\n      author {\n        id\n        name\n        bio\n        birthYear\n        nationality\n        books {\n          id\n          title\n          publishedYear\n        }\n      }\n      genres {\n        id\n        name\n        description\n      }\n    }\n  }\n": typeof types.GetBookDetailsDocument,
    "\n  query GetAuthors {\n    authors {\n      id\n      name\n      bio\n      birthYear\n      nationality\n      books {\n        id\n        title\n        publishedYear\n        rating\n      }\n    }\n  }\n": typeof types.GetAuthorsDocument,
    "\n  query GetGenres {\n    genres {\n      id\n      name\n      description\n    }\n  }\n": typeof types.GetGenresDocument,
    "\n  query SearchBooks($query: String!) {\n    searchBooks(query: $query) {\n      id\n      title\n      description\n      publishedYear\n      rating\n      author {\n        name\n      }\n      genres {\n        name\n      }\n    }\n  }\n": typeof types.SearchBooksDocument,
    "\n  mutation AddBook($input: AddBookInput!) {\n    addBook(input: $input) {\n      code\n      success\n      message\n      book {\n        id\n        title\n        description\n        publishedYear\n        author {\n          name\n        }\n        genres {\n          name\n        }\n      }\n    }\n  }\n": typeof types.AddBookDocument,
    "\n  mutation AddAuthor($input: AddAuthorInput!) {\n    addAuthor(input: $input) {\n      code\n      success\n      message\n      author {\n        id\n        name\n        bio\n        birthYear\n        nationality\n      }\n    }\n  }\n": typeof types.AddAuthorDocument,
    "\n  mutation UpdateBookRating($bookId: ID!, $rating: Float!) {\n    updateBookRating(bookId: $bookId, rating: $rating) {\n      id\n      title\n      rating\n    }\n  }\n": typeof types.UpdateBookRatingDocument,
    "\n  mutation DeleteBook($id: ID!) {\n    deleteBook(id: $id)\n  }\n": typeof types.DeleteBookDocument,
};
const documents: Documents = {
    "\n  query GetBooksEnhanced($filter: BookFilter, $first: Int, $after: String) {\n    books(filter: $filter, first: $first, after: $after) {\n      edges {\n        node {\n          id\n          title\n          description\n          publishedYear\n          isbn\n          pages\n          rating\n          coverUrl\n          createdAt\n          author {\n            id\n            name\n            bio\n            birthYear\n            nationality\n          }\n          genres {\n            id\n            name\n            description\n          }\n        }\n        cursor\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      totalCount\n    }\n  }\n": types.GetBooksEnhancedDocument,
    "\n  query GetBookDetails($id: ID!) {\n    book(id: $id) {\n      id\n      title\n      description\n      publishedYear\n      isbn\n      pages\n      rating\n      coverUrl\n      createdAt\n      author {\n        id\n        name\n        bio\n        birthYear\n        nationality\n        books {\n          id\n          title\n          publishedYear\n        }\n      }\n      genres {\n        id\n        name\n        description\n      }\n    }\n  }\n": types.GetBookDetailsDocument,
    "\n  query GetAuthors {\n    authors {\n      id\n      name\n      bio\n      birthYear\n      nationality\n      books {\n        id\n        title\n        publishedYear\n        rating\n      }\n    }\n  }\n": types.GetAuthorsDocument,
    "\n  query GetGenres {\n    genres {\n      id\n      name\n      description\n    }\n  }\n": types.GetGenresDocument,
    "\n  query SearchBooks($query: String!) {\n    searchBooks(query: $query) {\n      id\n      title\n      description\n      publishedYear\n      rating\n      author {\n        name\n      }\n      genres {\n        name\n      }\n    }\n  }\n": types.SearchBooksDocument,
    "\n  mutation AddBook($input: AddBookInput!) {\n    addBook(input: $input) {\n      code\n      success\n      message\n      book {\n        id\n        title\n        description\n        publishedYear\n        author {\n          name\n        }\n        genres {\n          name\n        }\n      }\n    }\n  }\n": types.AddBookDocument,
    "\n  mutation AddAuthor($input: AddAuthorInput!) {\n    addAuthor(input: $input) {\n      code\n      success\n      message\n      author {\n        id\n        name\n        bio\n        birthYear\n        nationality\n      }\n    }\n  }\n": types.AddAuthorDocument,
    "\n  mutation UpdateBookRating($bookId: ID!, $rating: Float!) {\n    updateBookRating(bookId: $bookId, rating: $rating) {\n      id\n      title\n      rating\n    }\n  }\n": types.UpdateBookRatingDocument,
    "\n  mutation DeleteBook($id: ID!) {\n    deleteBook(id: $id)\n  }\n": types.DeleteBookDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBooksEnhanced($filter: BookFilter, $first: Int, $after: String) {\n    books(filter: $filter, first: $first, after: $after) {\n      edges {\n        node {\n          id\n          title\n          description\n          publishedYear\n          isbn\n          pages\n          rating\n          coverUrl\n          createdAt\n          author {\n            id\n            name\n            bio\n            birthYear\n            nationality\n          }\n          genres {\n            id\n            name\n            description\n          }\n        }\n        cursor\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query GetBooksEnhanced($filter: BookFilter, $first: Int, $after: String) {\n    books(filter: $filter, first: $first, after: $after) {\n      edges {\n        node {\n          id\n          title\n          description\n          publishedYear\n          isbn\n          pages\n          rating\n          coverUrl\n          createdAt\n          author {\n            id\n            name\n            bio\n            birthYear\n            nationality\n          }\n          genres {\n            id\n            name\n            description\n          }\n        }\n        cursor\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      totalCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBookDetails($id: ID!) {\n    book(id: $id) {\n      id\n      title\n      description\n      publishedYear\n      isbn\n      pages\n      rating\n      coverUrl\n      createdAt\n      author {\n        id\n        name\n        bio\n        birthYear\n        nationality\n        books {\n          id\n          title\n          publishedYear\n        }\n      }\n      genres {\n        id\n        name\n        description\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetBookDetails($id: ID!) {\n    book(id: $id) {\n      id\n      title\n      description\n      publishedYear\n      isbn\n      pages\n      rating\n      coverUrl\n      createdAt\n      author {\n        id\n        name\n        bio\n        birthYear\n        nationality\n        books {\n          id\n          title\n          publishedYear\n        }\n      }\n      genres {\n        id\n        name\n        description\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAuthors {\n    authors {\n      id\n      name\n      bio\n      birthYear\n      nationality\n      books {\n        id\n        title\n        publishedYear\n        rating\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAuthors {\n    authors {\n      id\n      name\n      bio\n      birthYear\n      nationality\n      books {\n        id\n        title\n        publishedYear\n        rating\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetGenres {\n    genres {\n      id\n      name\n      description\n    }\n  }\n"): (typeof documents)["\n  query GetGenres {\n    genres {\n      id\n      name\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchBooks($query: String!) {\n    searchBooks(query: $query) {\n      id\n      title\n      description\n      publishedYear\n      rating\n      author {\n        name\n      }\n      genres {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query SearchBooks($query: String!) {\n    searchBooks(query: $query) {\n      id\n      title\n      description\n      publishedYear\n      rating\n      author {\n        name\n      }\n      genres {\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddBook($input: AddBookInput!) {\n    addBook(input: $input) {\n      code\n      success\n      message\n      book {\n        id\n        title\n        description\n        publishedYear\n        author {\n          name\n        }\n        genres {\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddBook($input: AddBookInput!) {\n    addBook(input: $input) {\n      code\n      success\n      message\n      book {\n        id\n        title\n        description\n        publishedYear\n        author {\n          name\n        }\n        genres {\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddAuthor($input: AddAuthorInput!) {\n    addAuthor(input: $input) {\n      code\n      success\n      message\n      author {\n        id\n        name\n        bio\n        birthYear\n        nationality\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddAuthor($input: AddAuthorInput!) {\n    addAuthor(input: $input) {\n      code\n      success\n      message\n      author {\n        id\n        name\n        bio\n        birthYear\n        nationality\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateBookRating($bookId: ID!, $rating: Float!) {\n    updateBookRating(bookId: $bookId, rating: $rating) {\n      id\n      title\n      rating\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateBookRating($bookId: ID!, $rating: Float!) {\n    updateBookRating(bookId: $bookId, rating: $rating) {\n      id\n      title\n      rating\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteBook($id: ID!) {\n    deleteBook(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteBook($id: ID!) {\n    deleteBook(id: $id)\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;