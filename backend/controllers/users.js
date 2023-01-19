//==================
//   DEPENDENCIES  
//==================
const express = require('express');
const router = express.Router();
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');
const passport = require('../config/passport');
const config = require('../config/config');
const saltRounds = 10;

// Models
const db = require("../models");
const User = db.User;


function isAuthenticated(req, res, next) {
    if (req.headers.authorization) {
        next()
    } else {
        res.sendStatus(401)
    }
}
//==================
//     ROUTES
//==================


//=================================
//   SIGN UP ROUTE / CREATE USER
//=================================
router.post('/signup', async (req, res) => {
    // Verify the request body has an username and password
    if (req.body.username && req.body.password) {
        const hashPassword = await bcrypt.hash(req.body.password, saltRounds)
        // Make a new user object with the request body and password
        let newUser = {
            username: req.body.username,
            password: hashPassword
        }
        // Check if a user exists with the same username and password
        User.findOne({ username: req.body.username })
            .then((user) => {
                if (!user) {
                    User.create(newUser)
                        .then(user => {
                            if (user) {
                                const payload = {
                                    id: user._id,
                                    username: user.username
                                }
                                const token = jwt.encode(payload, config.jwtSecret)
                                res.json({
                                    token: token,
                                    username: user.username,
                                    userId: user._id
                                })
                                // Send an error if the user already exists
                            } else {
                                return res.status(401).json({ message: 'User already exists' })
                            }
                        })
                    // Send error if user used an invalid usernam
                } else {
                    return res.status(401).json({ message: 'Invalid username' })
                }
            })
        // Send an error if the request body does not have an username and password
    } else {
        return res.status(401).json({ message: 'Request missing username or password' })
    }
})




//==================================
//   LOG IN ROUTE / FIND ONE USER
//==================================
router.post('/login', (req, res) => {
    // Attempt to find the user by their username and password in the database
    if (req.body.username && req.body.password) {
        User.findOne({ username: req.body.username }, async (err, user) => {
            if (err || user == null) {
                res.sendStatus(404)
            }
            // check to:
            // 1. make sure the user was found in the database
            // 2. make sure the user entered in the correct password
            const match = await bcrypt.compare(req.body.password, user.password)
            if (match === true) {
                const payload = { id: user._id, username: user.username }
                const token = jwt.encode(payload, config.jwtSecret)
                res.json({
                    token: token,
                    username: user.username,
                    userId: user._id
                })
            } else {
                res.status(401).json({ message: 'Invalid credentials' })
            }
        })
    } else {
        res.status(404).json({ message: 'User not found' })
    }
});




// Token Show. Finds all reviews in the database where the reviewer field is equal to the user's ID
//and sends back a JSON response to the client with the user object and the user's reviews.
router.get('/token', isAuthenticated, async (req, res) => {
    const tokenString = req.headers.authorization
    const token = tokenString.replace("Bearer ", "");
    const decoded = jwt.decode(token, config.jwtSecret)
    const User = await db.User.findById(decoded.id)
    const userReviews = await db.Review.find({ reviewer: User._id })
    res.json({
        user: User,
        reviews: userReviews
    })
})

//=======================================
//   GET USER DATA (IF USER IS LOGGED IN)
//=======================================
router.get('/:id', async (req, res) => {
    const foundUser = await User.findById(req.params.id)
    if (foundUser) {
        res.json(foundUser)
    } else {
        res.sendStatus(401)
    }
})

module.exports = router