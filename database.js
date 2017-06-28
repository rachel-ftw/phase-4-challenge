const pg = require('pg')
const dbName = 'vinyl'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const client = new pg.Client(connectionString)

client.connect()

// Query helper function
const query = function(sql, variables, callback){
  console.log('QUERY ->', sql.replace(/[\n\s]+/g, ' '), variables)

  client.query(sql, variables, function(error, result){
    if (error){
      console.log('QUERY <- !!ERROR!!')
      console.error(error)
      callback(error)
    }else{
      console.log('QUERY <-', JSON.stringify(result.rows))
      callback(error, result.rows)
    }
  })
}

const getAlbums = function(callback) {
  query("SELECT * FROM albums", [], callback)
}

const getAlbumsByID = function(albumID, callback) {
  query("SELECT * FROM albums WHERE id = $1", [albumID], callback)
}

const getUsersByID = function(userID, callback) {
  // console.log('-----------', typeof userID)
  query("SELECT * FROM users WHERE id = $1", [userID], callback)
}

const getUsersByEmail = function(email, callback) {
  // console.log('-----------', typeof email)
  query("SELECT * FROM users WHERE email = $1", [email], callback)
}

const getUser = (email, password, callback) => {
  query('SELECT * FROM users WHERE email=$1 AND password=$2', [email, password], callback)
}

const getReviewsByUserID = function(userID, callback) {
  // console.log('-----------', typeof userID)
  query("SELECT * FROM reviews WHERE user_id = $1", [userID], callback)
}

const getAlbumNameByReviewID = function(userID, callback) {
  getReviewsByUserID(userID, (error, reviews) => {
    query("SELECT name FROM albums")
  })
}

module.exports = {
  getAlbums,
  getAlbumsByID,
  getUsersByID,
  getReviewsByUserID,
  getUsersByEmail,
  getUser
}
