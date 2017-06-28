const express = require('express')
const bodyParser = require('body-parser')
const database = require('./database')
const app = express()
const passport = require('./passport')

require('ejs')
app.set('view engine', 'ejs');

app.use(express.static('public'))
// app.use(bodyParser.urlencoded({ extended: true }))

// app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

app.use( (req, res, next) => {
  res.locals.isLoggedIn = req.isAuthenticated();
  next();
});

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (request, response) => {
  database.getAlbums((error, albums) => {
    if (error) {
      response.status(500).render('error', { error: error })
    } else {
      response.render('index', { albums: albums })
    }
  })
})

app.get('/login', (request, response) => {
  response.render('log_in')
})

app.post('/login', passport.authenticate('local'), ( request, response ) => {
  const email = request.body.email
  console.log('got to login route')
  database.getUsersByEmail(email, (error, user) => {
    if (error) {
      response.status(500).render('error', { error: error })
    } else {
      console.log('-----------',user)
      response.redirect( '/users/' + user[0].id )
    }

  })
});

app.get('/signup', (request, response) => {
  response.render('sign_up')
})


app.get('/albums/:albumID', (request, response) => {
  const albumID = request.params.albumID

  database.getAlbumsByID(albumID, (error, albums) => {
    if (error) {
      response.status(500).render('error', { error: error })
    } else {
      const album = albums[0]
      response.render('album', { album: album })
    }
  })
})

app.get('/users/:userID', (request, response) => {
  const { userID } = request.params

  database.getUsersByID(userID, (error, user) => {
    if (error) {
      response.status(500).render('error', { error: error })
    } else {
      console.dir(user)
      response.render('profile', { user: user })
    }
  })
})

app.get('/play/:userID', (request, response) => {
  const { userID } = request.params
  let hi
  const reviewsByUserID = new Promise((resolve, reject) => {
    database.getReviewsByUserID(userID, (error, review) => {
      if (error) {
        response.status(500).render('error', { error: error })
      } else {
        console.dir(review)
        hi = review
      }
    })
  })

  const albumsByReviewID = new Promise((resolve, reject) => {
    database.getReviewsByUserID(userID, (error, review) => {
      if (error) {
        response.status(500).render('error', { error: error })
      } else {
        console.dir(review)
        hi = review
      }
    })
  })
  reviewsByUserID
    .then(outcome => console.log('!!!!!!!!!!!!!!!!!!', outcome))
  database.getUsersByID(userID, (error, user) => {
    if (error) {
      response.status(500).render('error', { error: error })
    } else {
      console.dir(user)
      response.render('profile', { user: user, reviews: hi })
    }
  })
})


app.use((request, response) => {
  response.status(404).render('not_found')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})
