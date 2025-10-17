import { useQuery } from "@apollo/client/react";
import "./App.css";
import { GetBooksDocument } from "./gql/graphql";

function App() {
  const { loading, error, data } = useQuery(GetBooksDocument);

  if (loading) return <p>Chargement des livres...</p>;
  if (error) return <p>Erreur: {error.message}</p>;

  if (!data || !data.books) {
    return <p>Aucun livre trouvé</p>;
  }

  // Plus de soucis de type safety grâce au codegen
  return (
    <>
      <h1>Ma collection de livres</h1>
      <div className="books-list">
        {data.books.map((book, index) => (
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
