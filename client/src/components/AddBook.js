import React from "react";
import { useQuery } from "@apollo/client";
import { getAuthorsQuery } from "../queries/queries";

export default function AddBook() {
  const { loading, error, data } = useQuery(getAuthorsQuery);

  return (
    <form id="add-book">
      <div className="field">
        <label>Book name:</label>
        <input type="text" />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text" />
      </div>

      <div className="field">
        <label>Author:</label>
        <select>
          {loading ? <option>Loading...</option> : null}
          {error ? <option>error...</option> : null}
          {data
            ? data.authors.map((author) => (
                <option key={author.id}>{author.name}</option>
              ))
            : null}
        </select>
      </div>

      <button>Add a book</button>
    </form>
  );
}

/* 
<form id="add-book">

        <div className="field">
          <label>Book name:</label>
          <input type="text"/>
        </div>
        
        <div className="field">
          <label>Genre:</label>
          <input type="text"/>
        </div>

        <div className="field">
          <label>Author:</label>
          <select>
            <option>Select Author</option>
          </select>
        </div>

        <button></button>

      </form>

*/
