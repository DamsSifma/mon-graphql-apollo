import { useQuery } from "@apollo/client/react";
import "./App.css";
import { GetBooksEnhancedDocument, GetBooksEnhancedQuery } from "./gql/graphql";

function App() {
  const { loading, error, data } = useQuery<GetBooksEnhancedQuery>(
    GetBooksEnhancedDocument
  );

  if (loading) return <p>Chargement des livres...</p>;
  if (error) return <p>Erreur: {error.message}</p>;

  if (!data?.books?.edges?.length) {
    return <p>Aucun livre trouvé</p>;
  }

  return (
    <>
      <h1>Ma collection de livres ({data.books.totalCount} livres)</h1>
      <div className="books-list">
        {data.books.edges.map(({ node: book }) => (
          <div key={book.id} className="book-card">
            <h3>{book.title}</h3>
            <p>
              by {book.author.name} ({book.author.nationality})
            </p>
            {book.description && (
              <p className="description">{book.description}</p>
            )}
            <div className="book-meta">
              <span>📅 {book.publishedYear}</span>
              {book.rating && <span>⭐ {book.rating}/5</span>}
              <span>🏷️ {book.genres.map((g) => g.name).join(", ")}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
