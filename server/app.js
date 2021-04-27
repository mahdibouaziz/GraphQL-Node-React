const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();
const port = 4000;

const linkDB =
  "mongodb+srv://test:thisismypass@cluster0.1yjwd.mongodb.net/graphQl?retryWrites=true&w=majority";

mongoose
  .connect(linkDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("Connected to the database"));

//use our schema
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
