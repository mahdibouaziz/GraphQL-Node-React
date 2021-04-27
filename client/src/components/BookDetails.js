import React from "react";
import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/queries";

export default function BookDetails({ idDetail }) {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: { id: idDetail },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return null;
  console.log(data);
  if (data) {
    return (
      <div>
        <p>Book Name:{data.book.name}</p>
        <p>Book Genre:{data.book.genre}</p>
        <p>Book Author:{data.book.author.name}</p>
        <p>Book Author Age:{data.book.author.age}</p>
      </div>
    );
  }
}
