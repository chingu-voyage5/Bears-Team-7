const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const app = express();
const PORT = 4000;

//Set up middleware endpoint to understand GraphQL
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true //For development 
}))

//Set the connection with server
app.listen(PORT, () => {
  console.log(`Now listenning for requests on port ${PORT}`);
});