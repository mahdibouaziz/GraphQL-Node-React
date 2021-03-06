import { gql } from "@apollo/client";

export const getAuthorsQuery = gql`
  query {
    authors {
      id
      name
    }
  }
`;

export const getBooksQuery = gql`
  query {
    books {
      id
      name
    }
  }
`;

export const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      genre
    }
  }
`;

export const getBookQuery = gql`
  query($id: ID!) {
    book(id: $id) {
      name
      genre
      author {
        name
        age
        books {
          name
        }
      }
    }
  }
`;
