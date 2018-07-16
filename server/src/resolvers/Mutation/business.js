const {
  getUserId
} = require('../../utils')

const business = {
  async createBusiness(parent, args, context, info) {
    const userId = getUserId(context)

    if (!userId) {
      throw new Error(`Invalid permissions, you must be an active user`)
    }

    const placeExists = await context.db.exists.Business({
        yelpId: args.yelpId
      },
      info
    )

    if (placeExists) {
      throw new Error(`${args.name} already created`)
    }
    const newPlace = await context.db.mutation.createBusiness({
        data: {
          yelpId: args.yelpId,
          name: args.name,
          price: args.price,
          photos: args.photos,
          location: {
            create: {
              address1: args.address,
              city: args.city,
              state: args.state,
              country: args.country
            }
          },
          coordinates: {
            create: {
              longitude: args.longitude,
              latitude: args.latitude
            }
          },
          categories: {
            create: {
              title: args.cat_title
            }
          }
        }
      },
      info
    )
    if (newPlace) {
      return newPlace
    }
    throw new Error(`Place can't be created`)
  },
  async updateBusiness (parent, args, context, info) {
    const updates = {...args}
    delete updates.id
    return context.db.mutation.updateBusiness({
      where: { id: args.id },
      data: {
        ...updates,
      }
    },info)
  },
  async addLoveToBusiness(parent, args, context, info) {
    const userId = getUserId(context)

    const isLoved = await context.db.exists.Loving({
      lover: {
        id: userId
      },
      business: {
        id: args.placeId
      }
    })

    if (isLoved) {
      throw new Error('Already loving')
    }

    return context.db.mutation.createLoving({
        data: {
          lover: {
            connect: {
              id: userId
            }
          },
          business: {
            connect: {
              id: args.placeId
            }
          }
        }
      },
      info
    )
  },
  async removeLoveToBusiness(parent, args, context, info) {
    const userId = getUserId(context)
    const where = {
      id: args.placeId
    }

    const loving = await context.db.query.lovings({
      lover: {
        id: userId
      },
      business: {
        id: args.placeId
      }
    })
    if (loving) {
      return context.db.mutation.deleteLoving({
       where:{
         id: loving[0].id
       }
      },
      info
    )
    }

    throw new Error(`User doesn't love this place`)
  }
}

module.exports = {
  business
}