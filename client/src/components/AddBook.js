import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";

export default function AddBook() {
  const { loading, error, data } = useQuery(getAuthorsQuery);

  const [bookName, setBookName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  // eslint-disable-next-line no-unused-vars
  const [addBookMut, { dataMutation }] = useMutation(addBookMutation);

  const submitForm = () => {
    addBookMut({
      variables: {
        name: bookName,
        genre: genre,
        authorId: authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
  };

  return (
    <form id="add-book">
      <div className="field">
        <label>Book name:</label>
        <input
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          type="text"
        />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          type="text"
        />
      </div>

      <div className="field">
        <label>Author:</label>
        <select value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
          {loading ? <option>Loading...</option> : null}
          {error ? <option>error...</option> : null}
          {data
            ? data.authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))
            : null}
        </select>
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          submitForm();
        }}
      >
        Add a book
      </button>
    </form>
  );
}
