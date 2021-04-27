import React from "react";
import { useQuery, gql } from "@apollo/client";

const getBooksQuery = gql`
  query {
    books {
      id
      name
    }
  }
`;

export default function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <ul id="book-list">
        {data.books.map((book) => (
          <li key={book.id}>{book.name}</li>
        ))}
      </ul>
    </div>
  );
}
