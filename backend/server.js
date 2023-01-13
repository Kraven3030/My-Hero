// +-+-+-+-+-+-+-+-+-+-+-+-+
// |D|E|P|E|N|D|E|N|C|I|E|S|
// +-+-+-+-+-+-+-+-+-+-+-+-+
const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT
const methodOverride = require('method-override');
const passport = require('./config/passport')()
const cors = require('cors')


//Access to controllers
const reviewsCtrl = require('./controllers/reviews.js')
const usersCtrl = require('./controllers/users.js')


// +-+-+-+-+-+-+-+-+-+-+
// |M|I|D|D|L|E|W|A|R|E|
// +-+-+-+-+-+-+-+-+-+-+
// Cross origin allowance
app.use(cors())
// Parse the body data
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(passport.initialize())
app.use(methodOverride('_method'));

// +-+-+-+-+-+-+
// |R|O|U|T|E|S|
// +-+-+-+-+-+-+
app.use('/reviews', reviewsCtrl)
app.use('/users', usersCtrl)


// +-+-+-+-+-+-+-+-+
// |L|I|S|T|E|N|E|R|
// +-+-+-+-+-+-+-+-+
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
})