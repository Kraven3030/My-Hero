//==================
//   DEPENDENCIES  
//==================
const db = require("../models");
const express = require('express');
const router = express.Router();
const jwt = require('jwt-simple')
const config = require('../config/config');
const Review = db.Review;


// Checks if a user is authenticated.
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

//======================
//  CREATE REVIEW ROUTE
//======================
router.post('/create', isAuthenticated, async (req, res) => {
    const newReview = {
        marvelId: req.body.marvelId,
        marvelTitle: req.body.marvelTitle,
        title: req.body.title,
        body: req.body.body,
        createdAt: req.body.createdAt,
        reviewer: req.body.reviewer
    }
    Review.create(newReview)
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Review created successfully"
            })
        })
        .catch(error => {
            res.status(500).json({
                message: "An error occurred",
                error
            });
        });
});

//==========================
//   REVIEWS BY USER ID
//==========================
router.get('/user/:id', (req, res) => {
    console.log("Reviews for user " + req.params.id);
    db.User.findById(
        req.params.id,
        (err, user) => {
            if (err) {
                res.sendStatus(500).json({ message: 'No reviews found!' })
                console.log(err)
            } else {

                console.log(user)
                if (user) {
                    db.Review.find(
                        { 'reviewer': req.params.id },
                        { marvelTitle: true, title: true, body: true, _id: true },
                        (err, reviews) => {
                            const result = {
                                user: user.username,
                                reviews: [reviews]
                            }
                            res.json(result)
                        }
                    )
                }
            }
        }
    )
})



//==================
//   UPDATE ROUTE
//==================
router.put('/update', isAuthenticated, async (req, res) => {
    const updatedReview = await db.Review.findByIdAndUpdate(
        req.body.reviewId,
        { title: req.body.title, body: req.body.body },
        { new: true }
    );
    res.json(updatedReview)
})


//==================
//   DELETE ROUTE
//==================
router.delete('/delete/:id', isAuthenticated, async (req, res) => {
    db.Review.findByIdAndRemove(req.params.id)
        .then(result => {
            res.sendStatus(200)
        })
})

//==========================
//   REVIEWS BY All USERS
//==========================
router.get('/', async (req, res) => {
    console.log("All Reviews");
    const populatedReviews = await
        Review.find({}).populate('reviewer')
    res.json(populatedReviews)
})

module.exports = router