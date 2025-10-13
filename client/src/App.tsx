import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import "./App.css";

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

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1>My Book Collection</h1>
      <div className="books-list">
        {data.books.map(
          (book: { title: string; author: string }, index: number) => (
            <div key={index} className="book-card">
              <h3>{book.title}</h3>
              <p>by {book.author}</p>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default App;
