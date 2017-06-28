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

const getReviewsForHomePage = function(callback) {
  query(`SELECT * FROM albums
    INNER JOIN reviews ON (albums.id = reviews.album_id)
    INNER JOIN users ON (reviews.user_id = users.id)
    ORDER by reviews.review_date desc LIMIT 3`, [], callback)
}

const getAlbumsAndReviews = function(callback) {
  query("SELECT * FROM reviews", [], callback)
}

const getAlbumsByID = function(albumID, callback) {
  query("SELECT * FROM albums WHERE id = $1", [albumID], callback)
}

const getUsersByID = function(userID, callback) {
  query("SELECT * FROM users WHERE id = $1", [userID], callback)
}

const getUsersByEmail = function(email, callback) {
  query("SELECT * FROM users WHERE email = $1", [email], callback)
}

const getUser = (email, password, callback) => {
  query('SELECT * FROM users WHERE email=$1 AND password=$2', [email, password], callback)
}

const getReviewsByUserID = function(userID, callback) {
  query(`SELECT * FROM users
    INNER JOIN reviews ON (users.id = reviews.user_id)
    WHERE users.id = $1`, [userID], callback)
}

const getReviewsByAlbumID = function(albumID, callback) {
  query(`SELECT * FROM albums
    INNER JOIN reviews ON (albums.id = reviews.album_id)
    INNER JOIN users ON (reviews.user_id = users.id)
    WHERE albums.id = $1
    ORDER by reviews.review_date desc `, [albumID], callback)
}

const deleteReview = function(reviewID, callback){
  query("DELETE FROM reviews WHERE reviews.id = $1 RETURNING *", [reviewID], callback)
}

module.exports = {
  getAlbums,
  getAlbumsByID,
  getUsersByID,
  getReviewsByUserID,
  getUsersByEmail,
  getUser,
  getReviewsForHomePage,
  getReviewsByAlbumID,
  deleteReview
}
