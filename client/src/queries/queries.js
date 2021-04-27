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
