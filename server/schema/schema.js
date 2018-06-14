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

//dummy data
const places = [{
  id: "1",
  yelp_id: "SGRmnarrNuVEsAjYdEoA0w",
  name: "El Farolito",
  is_closed: false,
  lat: 37.75265,
  lng: -122.41812,
  phone: "(415) 824-7877",
  address: "2779 Mission St",
  city: "San Francisco",
  state: "CA",
  country: "US"
}, {
  id: "2",
  yelp_id: "JARsJVKLPgs_yC3cwDnp7g",
  name: "La Taqueria",
  is_closed: false,
  lat: 37.750883,
  lng: -122.418123,
  phone: "(415) 524-7677",
  address1: "2889 Mission St",
  city: "San Francisco",
  state: "CA",
  country: "US"
}, {
  id: "3",
  yelp_id: "g0VCHer2uE5NLOEdblZuSw",
  name: "Taqueria Cancún",
  is_closed: false,
  lat: 37.76047,
  lng: -122.41951,
  phone: "(415) 224-4873",
  address1: "2288 Mission St",
  city: "San Francisco",
  state: "CA",
  country: "US"
}]

/**
 * TODO
 * When mongodb is ready please change id type to GraphQLID
 */
const PlaceType = new GraphQLObjectType({
  name: 'Place',
  fields: () => ({
    id: {
      type: GraphQLString
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
    address: {
      type: GraphQLString
    },
    city: {
      type: GraphQLString
    },
    state: {
      type: GraphQLString
    },
    country: {
      type: GraphQLString
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
    },
    counter: {
      type: GraphQLInt
    }
  })
});

/**
 * TODO
 * When mongodb is ready please change id type to GraphQLID
 */
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    place: {
      type: PlaceType,
      description: 'Returns a single place',
      args: {
        id: {
          type: GraphQLNonNull(GraphQLString)
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