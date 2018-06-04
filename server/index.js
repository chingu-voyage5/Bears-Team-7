const express = require('express');
const { ApolloServer, gql} = require('apollo-server');
const { registerServer } = require('apollo-server-express');

const PORT = process.env.PORT || 'http://localhost:5000/graphiql';
const IP = process.env.IP || '';

const app = express();

// Some fake data
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// The GraphQL schema in string form
const typeDefs = gql`
  type Query { 
    books: [Book] 
  }
  type Book { 
    title: String, 
    author: String 
  }
`;

// The resolvers
const resolvers = {
  Query: { books: () => books },
};

const server = new ApolloServer({typeDefs, resolvers});

registerServer({ server, app });

// normal ApolloServer listen call but url will contain /graphql
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

// const express = require('express');
// const bodyParser = require('body-parser');
// const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
// const { makeExecutableSchema } = require('graphql-tools');


// // The GraphQL schema in string form
// const typeDefs = `
//   type Query { books: [Book] }
//   type Book { title: String, author: String }
// `;

// // The resolvers
// const resolvers = {
//   Query: { books: () => books },
// };

// // Put together a schema
// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
// });

// // Initialize the app
// const app = express();

// // The GraphQL endpoint
// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// // GraphiQL, a visual editor for queries
// app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// console.log(PORT)
// // Start the server
// // For local test change process.env.PORT, process.env.IP to 3000 or any port
// app.listen(PORT, IP, () => {
//   //console.log('Go to http://localhost:3000/graphiql to run queries!');
//   console.log('Go to https://chingu-voyage5-julianabf.c9users.io/graphiql to run queries!');
// });