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
  let allReviews
  const getAllReviews = new Promise((resolve, reject) => {
    database.getReviewsForHomePage((error, review) => {
      if (error) {
        response.status(500).render('error', { error: error })
      } else {
        allReviews = review
      }
    })
  })

  database.getAlbums((error, albums) => {
    if (error) {
      response.status(500).render('error', { error: error })
    } else {
      console.log('!!!!!!!!!!!!!!!!', allReviews)
      response.render('index', { albums: albums, reviews: allReviews })
    }
  })
})

// app.get('/', (request, response) => {
//   database.getAlbums((error, data) => {
//     if (error) {
//       response.status(500).render('error', { error: error })
//     } else {
//       return data
//     }
//   })
//     .then(data =>)
// })

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

  database.getReviewsByAlbumID(albumID, (error, albums) => {
    if (error) {
      response.status(500).render('error', { error: error })
    } else {
      console.log('&&&&&&&&&&&&&&&&', albums)
      response.render('album', { album: albums[0], reviews: albums })
    }
  })
})

app.get('/users/:userID', (request, response) => {
  const { userID } = request.params

  database.getReviewsByUserID(userID, (error, user) => {
    if (error) {
      response.status(500).render('error', { error: error })
    } else {
      console.log('#############', user)
      response.render('profile', {user: user[0], reviews: user})
    }
  })
})

app.get('/review/:albumID', (request, response) => {
  const { albumID } = request.params

  database.getAlbumsByID(albumID, (error, album) => {
    if (error) {
      response.status(500).render('error', { error: error })
    } else {
      console.log('#############', album)
      response.render('new_review', {album: album[0]})
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
