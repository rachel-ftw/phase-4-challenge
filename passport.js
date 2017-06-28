const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const database = require('./database')

const paramsOptions = {
  usernameField: 'email'
}

const findUser = (email, password) => database.getUsers(email, password)

const strategy = new LocalStrategy( paramsOptions, (email, password, done ) => {
  database.getUser(email, password, (error, user) => {
    if( user === null ) {
      console.log('incorrect password or username')
      done( null, false, { message: 'Incorrect email or password.' })
    } else {
      done(null, user)
    }
  })
})

passport.use(strategy)

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

module.exports = passport
