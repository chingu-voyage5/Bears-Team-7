const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const auth = {
  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase()
    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.db.mutation.createUser({
      data: { ...args,
        password
      },
    })

    const token = jwt.sign({userId: user.id}, process.env.APP_SECRET)
    ctx.response.cookie('token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 365,
      httpOnly: true,
    })
    return {user, token}
  },
  async signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token')
    return { message: 'Goodbye!'}
  },
  async login(parent, {
    email,
    password
  }, ctx, info) {
    const user = await ctx.db.query.user({
      where: {
        email
      }
    })
    if (!user) {
      throw new Error(`No such user found for email: ${email}`)
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }

    const token = jwt.sign({userId: user.id}, process.env.APP_SECRET)
    ctx.response.cookie('token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 365,
      httpOnly: true,
    })
    return {user, token}
  },
}

module.exports = {
  auth
}