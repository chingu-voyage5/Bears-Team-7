const {
  getUserId
} = require('../utils')

const Query = {
  me(parent, args, context, info) {
    const id = getUserId(context)
    return context.db.query.user({
      where: {
        id
      }
    }, info)
  },
  search(parent, {
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
  business(parent, {
    id
  }, context, info) {
    return context.ylp.query.business({
        id
      },
      `{id name price photos location{address1 city state country} coordinates{latitude longitude} categories{title}}`)
  }
}

module.exports = {
  Query
}