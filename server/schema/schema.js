const graphql = require("graphql");
const Book = require("../models/book");
const Author = require("../models/author");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLError,
  GraphQLNonNull,
} = graphql;

//Creates our type here
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      // this will grab the author of the book
      async resolve(parent, args) {
        const { authorId } = parent;
        return await Author.findById(authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        const { id: authorId } = parent;
        // console.log(authorId);
        return await Author.find({ authorId });
      },
    },
  }),
});

//creates our query here
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        // get data from the ressource (db)
        // return books.find((book) => book.id == args.id);
        return await Book.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await Author.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        return await Book.find();
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      async resolve(parent, args) {
        return await Author.find();
      },
    },
  },
});

// Create our mutaions here
const Mutation = new GraphQLObjectType({
  name: "Mutaion",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(parent, args) {
        const { name, age } = args;
        const author = new Author({ name, age });
        try {
          return await author.save();
        } catch (e) {
          new GraphQLError(e);
        }
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const { name, genre, authorId } = args;
        const book = new Book({ name, genre, authorId });
        try {
          return await book.save();
        } catch (e) {
          new GraphQLError(e);
        }
      },
    },
  },
});

//export a schema of our queries
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
