import BookList from "./components/BookList";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

//Appllo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Reading List</h1>
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
