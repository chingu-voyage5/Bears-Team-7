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
    const queriedBusiness = await context.db.query.place({
        where: {
          id
        }
      },
      info)
    if (queriedBusiness) {
      return queriedBusiness
    }

    throw new Error(`Couldn't find business id: ${id}`)
  },
  async businesses(parent, args, context, info) {
    const queriedBusinesses = await context.db.query.places({

    }, info)

    if (queriedBusinesses) {
      return queriedBusinesses
    }

    throw new Error(`No businesses have been added`)
  },
  async lovedSharedByUser(parent, {
    userId
  }, context, info) {
    return await context.db.query.lovings({
      where: {
        user: {
          id: userId
        }
      }
    }, info)
  },
  async watchedSharedByUser(parent, {
    userId
  }, context, info) {
    return await context.db.query.watchings({
      where: {
        user: {
          id: userId
        }
      }
    }, info)
  }
}

module.exports = {
  Query
}