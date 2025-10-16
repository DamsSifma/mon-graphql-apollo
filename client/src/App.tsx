import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import "./App.css";

interface Book {
  title: string;
  author: string;
}

const GET_BOOKS = gql`
  query GetBooks {
    books {
      title
      author
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Chargement des livres...</p>;
  if (error) return <p>Erreur: {error.message}</p>;

  return (
    <>
      <h1>Ma collection de livres</h1>
      <div className="books-list">
        {data.books.map((book: Book, index: number) => (
          <div key={index} className="book-card">
            <h3>{book.title}</h3>
            <p>by {book.author}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
