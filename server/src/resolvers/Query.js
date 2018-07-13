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
  async business(parent, {
    id
  }, context, info) {
    const queriedBusiness = await context.db.query.business({
        where: {
          id
        }
      },
      info)
    if (queriedBusiness) {
      return queriedBusiness
    }

    throw new Error(`Couldn't find business id: ${id}`)
  }
}

module.exports = {
  Query
}