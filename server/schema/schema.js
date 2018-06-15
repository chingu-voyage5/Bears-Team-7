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
  addressId: '3',
  is_closed: false,
  phone: "(415) 824-7877",
  coordsId: '1'
}, {
  id: "2",
  yelp_id: "JARsJVKLPgs_yC3cwDnp7g",
  addressId: '1',
  name: "La Taqueria",
  is_closed: false,
  phone: "(415) 524-7677",
  coordsId: '2'
}, {
  id: "3",
  yelp_id: "g0VCHer2uE5NLOEdblZuSw",
  addressId: '2',
  name: "Taqueria Cancún",
  is_closed: false,
  phone: "(415) 224-4873",
  coordsId: '3'
}];

const addresses = [{
    id: '1',
    address: "2779 Mission St",
    city: "San Francisco",
    state: "CA",
    country: "US"
  },
  {
    id: '2',
    address: "2889 Sleet St",
    city: "San Francisco",
    state: "CA",
    country: "US"
  }, {
    id: '3',
    address: "2288 Varrick St",
    city: "San Francisco",
    state: "CA",
    country: "US"
  }
];

const coords = [{
    id: '1',
    lat: 37.75265,
    lng: -122.41812
  },
  {
    id: '2',
    lat: 37.76047,
    lng: -122.41951
  }, {
    id: '3',
    lat: 37.750883,
    lng: -122.418123
  }
]

/**
 * TODO
 * When mongodb is ready please change id type to GraphQLID
 */
const PlaceType = new GraphQLObjectType({
  name: 'Place',
  fields: () => ({
    id: {
      type: GraphQLString,
      description: 'Unique place id'
    },
    yelp_id: {
      type: GraphQLString,
      description: 'Unique Yelp id'
    },
    image: {
      type: GraphQLString,
      description: 'Place photo'
    },
    name: {
      type: GraphQLString,
      description: 'Name of the place'
    },
    price: {
      type: GraphQLString,
      description: 'Price level'
    },
    phone: {
      type: GraphQLString,
      description: 'Phone number of the place'
    },
    is_closed: {
      type: GraphQLBoolean,
      description: 'Whether place has been (permanently) closed'
    },
    counter: {
      type: GraphQLInt,
      description: 'Number of people recommended'
    },
    address_details: {
      type: AddressType,
      description: `Place's location, including address, city, state and country`,
      resolve(parent) {
        return addresses.find(address => address.id === parent.addressId);
      }
    },
    coordinates: {
      type: CoordinatesType,
      description: `The coordinates of the place`,
      resolve(parent) {
        return coords.find(coord => coord.id === parent.coordsId);
      }
    }
  })
});

const AddressType = new GraphQLObjectType({
  name: 'AddressType',
  description: `Place's location, including address, city, state and country`,
  fields: () => ({
    id: {
      type: GraphQLString,
      description: 'Unique id'
    },
    address: {
      type: GraphQLString,
      description: 'Street address'
    },
    city: {
      type: GraphQLString,
      description: 'City of the place'
    },
    state: {
      type: GraphQLString,
      description: 'State code of the place'
    },
    country: {
      type: GraphQLString,
      description: 'Country code of the plcae'
    }
  })
});

const CoordinatesType = new GraphQLObjectType({
  name: 'CoordinatesType',
  fields: () => ({
    id: {
      type: GraphQLString,
      description: 'Unique id'
    },
    lat: {
      type: GraphQLFloat,
      description: 'Latitude of the place'
    },
    lng: {
      type: GraphQLFloat,
      description: 'Longitude of the place'
    }
  })
})

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
    },
    address: {
      type: AddressType,
      description: 'Returns address from a single place',
      args: {
        id: {
          type: GraphQLNonNull(GraphQLString)
        }
      },
      resolve(parent) {
        return addresses.find(address => address.id === args.id);
      }
    },
    coordinates: {
      type: CoordinatesType,
      description: 'Retirns coordinates from a single place',
      args: {
        id: {
          type: GraphQLNonNull(GraphQLString)
        }
      },
      resolve(parent) {
        return coords.find(coord => coord.id === args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
})