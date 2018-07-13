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
  business(parent, {
    id
  }, context, info) {
    return context.db.query.business({
        where: {
          id
        }
      },
      info)
  }
}

module.exports = {
  Query
}