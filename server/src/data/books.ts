// Dataset de test
export interface Author {
  id: string;
  name: string;
  bio?: string;
  birthYear?: number;
  nationality?: string;
}

export interface Genre {
  id: string;
  name: string;
  description?: string;
}

export interface Book {
  id: string;
  title: string;
  description?: string;
  publishedYear?: number;
  isbn?: string;
  pages?: number;
  rating?: number;
  coverUrl?: string;
  authorId: string;
  genreIds: string[];
  createdAt: string;
}

// Sample authors
export const authors: Author[] = [
  {
    id: "1",
    name: "J.R.R. Tolkien",
    bio: "English writer, poet, philologist, and academic",
    birthYear: 1892,
    nationality: "British",
  },
  {
    id: "2",
    name: "Albert Camus",
    bio: "French philosopher, author, and journalist",
    birthYear: 1913,
    nationality: "French",
  },
  {
    id: "3",
    name: "George Orwell",
    bio: "English novelist, essayist, journalist and critic",
    birthYear: 1903,
    nationality: "British",
  },
];

// Sample genres
export const genres: Genre[] = [
  { id: "1", name: "Fantasy", description: "Magical and mythical stories" },
  { id: "2", name: "Philosophy", description: "Philosophical literature" },
  { id: "3", name: "Dystopian", description: "Dark future societies" },
  { id: "4", name: "Classic", description: "Timeless literature" },
];

// Enhanced books dataset
export const books: Book[] = [
  {
    id: "1",
    title: "Le Seigneur des Anneaux",
    description: "Une quête épique à travers la Terre du Milieu",
    publishedYear: 1954,
    isbn: "978-2-07-061248-4",
    pages: 1216,
    rating: 4.8,
    authorId: "1",
    genreIds: ["1", "4"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "L'Étranger",
    description: "L'histoire de Meursault et de l'absurdité de l'existence",
    publishedYear: 1942,
    isbn: "978-2-07-036002-1",
    pages: 186,
    rating: 4.2,
    authorId: "2",
    genreIds: ["2", "4"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "1984",
    description: "Une vision terrifiante d'un futur totalitaire",
    publishedYear: 1949,
    isbn: "978-2-07-036822-5",
    pages: 415,
    rating: 4.6,
    authorId: "3",
    genreIds: ["3", "4"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Le Hobbit",
    description: "L'aventure de Bilbon Sacquet",
    publishedYear: 1937,
    isbn: "978-2-07-058459-8",
    pages: 360,
    rating: 4.5,
    authorId: "1",
    genreIds: ["1", "4"],
    createdAt: new Date().toISOString(),
  },
];

// Helper functions
export const getBookById = (id: string): Book | undefined =>
  books.find((book) => book.id === id);

export const getAuthorById = (id: string): Author | undefined =>
  authors.find((author) => author.id === id);

export const getGenreById = (id: string): Genre | undefined =>
  genres.find((genre) => genre.id === id);

export const getBooksByAuthor = (authorId: string): Book[] =>
  books.filter((book) => book.authorId === authorId);

export const getBooksByGenre = (genreId: string): Book[] =>
  books.filter((book) => book.genreIds.includes(genreId));
