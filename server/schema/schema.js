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
    location: {
      type: GraphQLList
    },
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

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    place: {
      type: PlaceType,
      description: 'Returns a single place',
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        // code to get data from db / other source
        return places.find(place => place.id === args.id);
      }
    },
    places: {
      type: new GraphQLList(PlaceType),
      description: 'Returns a list of places',
      resolve(parent, args) {
        return places;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
})