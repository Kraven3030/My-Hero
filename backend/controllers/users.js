//==================
//   DEPENDENCIES  
//==================
const express = require('express')
const router = express.Router()
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt');
const config = require('../config/config')
const saltRounds = 10;

// Configs
// Models
const db = require("../models");
const User = db.User


function isAuthenticated(req, res, next) {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.decode(token, config.jwtSecret);
        req.userId = decoded._id;
        next();
    } else {
        res.sendStatus(401);
    }
}


//==================
//     ROUTES
//==================


//=================================
//   SIGN UP ROUTE / CREATE USER
//=================================
router.post('/signup', async (req, res) => {
    try {
        // Verify the request body has a username and password
        if (req.body.username && req.body.password) {
            const hashPassword = await bcrypt.hash(req.body.password, saltRounds)
            // Create new user object with the request body and hashed password
            let newUser = {
                username: req.body.username,
                password: hashPassword
            }
            // Check if a user already exists with the same username
            const existingUser = await User.findOne({ username: req.body.username })
            if (!existingUser) {
                // If the user does not already exist, create a new user
                const createdUser = await User.create(newUser)
                if (createdUser) {
                    // If the user was created successfully, generate a JWT and send it back to the client
                    const payload = {
                        _id: createdUser._id,
                        username: createdUser.username
                    }
                    const token = jwt.encode(payload, config.jwtSecret)
                    return res.status(200).json({
                        token: token,
                        username: createdUser.username,
                        userId: createdUser._id
                    })
                } else {
                    return res.status(401).json({ message: 'User already exists' })
                }
            } else {
                return res.status(401).json({ message: 'User already exists' })
            }
        } else {
            return res.status(401).json({ message: 'Request missing username or password field' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error });
    }
});



//==================================
//   LOG IN ROUTE / FIND ONE USER
//==================================
router.post('/login', async (req, res) => {
    try {
        // Attempt to find the user by their username in the database
        const foundUser = await User.findOne({ username: req.body.username });

        if (foundUser) {
            const isMatch = await bcrypt.compare(req.body.password, foundUser.password);
            if (isMatch) {
                // if the above applies, send the JWT to the browser
                const payload = { id: foundUser._id, username: foundUser.username };
                const token = jwt.encode(payload, config.jwtSecret);
                const userReviews = await db.Review({ user: foundUser._id })
                res.json({
                    username: foundUser.username,
                    userId: foundUser._id,
                    token: token,
                    reviews: userReviews
                });
                localStorage.setItem('username', foundUser.username)
                localStorage.setItem('userId', foundUser._id)
                localStorage.setItem('token', token)
            } else {
                res.status(401).json({ message: "Invalid Credentials" });
            }
        } else {
            res.status(401).json({ message: "Invalid Credentials" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'An error occurred', error });
    }
});



// Token Show. Finds all reviews in the database where the reviewer field is equal to the user's ID
//and sends back a JSON response to the client with the user object and the user's reviews.
router.get('/token', isAuthenticated, async (req, res) => {
    const tokenString = req.headers.authorization
    const token = tokenString.replace("Bearer ", "");
    const decoded = jwt.decode(token, config.jwtSecret)
    const foundUser = await db.User.findById(decoded.id)
    const userReviews = await db.Review.find({ user: foundUser._id })
    res.json({
        user: foundUser,
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