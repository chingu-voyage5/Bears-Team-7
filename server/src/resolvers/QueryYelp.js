const QueryYelp = {
  searchFromYelp(parent, {
    term,
    location,
    limit
  }, context, info) {
    return context.ylp.query.search({
        term,
        location,
        limit
      },
      `{total business {id name price photos location {address1 city state country} coordinates{latitude longitude} categories{title}}}
    `)
  },
  businessFromYelp(parent, {
    id
  }, context, info) {
    return context.ylp.query.business({
        id
      },
      `{id name price photos location{address1 city state country} coordinates{latitude longitude} categories{title}}`)
  }
}

module.exports = {
  QueryYelp
}