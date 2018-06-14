const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const PlaceType = new GraphQLObjectType({
  name: 'Place',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    image: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    price: {
      type: GraphQLInt
    },
    //location: { type}
    lat: {
      type: GraphQLFloat
    },
    lng: {
      type: GraphQLFloat
    },
    phone: {
      type: GraphQLString
    },
    is_closed: {
      type: GraphQLBoolean
    },
    yelp_id: {
      type: GraphQLString
    }
  })
});