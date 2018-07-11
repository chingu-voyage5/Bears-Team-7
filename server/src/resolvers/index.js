const {
  Query
} = require('./Query')
const {
  auth
} = require('./Mutation/auth')
const {
  business
} = require('./Mutation/business')
const {
  AuthPayload
} = require('./AuthPayload')

module.exports = {
  Query,
  Mutation: {
    ...auth,
    ...business,
  },
  AuthPayload,
}