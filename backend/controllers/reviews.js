//==================
//   DEPENDENCIES  
//==================
const db = require("../models");
const express = require('express');
const router = express.Router();
const jwt = require('jwt-simple')
const config = require('../config/config');
const Review = db.Review;


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
        heroId: req.body.heroId,
        heroTitle: req.body.heroTitle,
        body: req.body.body,
        reviewer: req.body.reviewer
    }
    Review.create(newReview)
        .then(review => {
            console.log(review);
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
router.get('/user', (req, res) => {
    db.User.findById(req.query.id)
        .then(user => {
            if (!user) {
                res.status(404).json({ message: "User not found" });
            } else {
                db.Review.find({ 'reviewer': req.query.id })
                    .then(reviews => {
                        res.json({
                            user: user.username,
                            reviews: [reviews]
                        });
                    });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "An error occurred",
                error
            });
        });
});



//==================
//   UPDATE ROUTE
//==================
router.put('/update', isAuthenticated, async (req, res) => {
    const updatedReview = await db.Review.findByIdAndUpdate(
        req.body.reviewId,
        { heroTitle: req.body.heroTitle, body: req.body.body },
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
//   REVIEWS BY COMIC ID
//==========================
router.get(':/id', async (req, res) => {
    console.log("Reviews by hero ID");
    const populatedReviews = await
        Review.findOne({ "heroId": req.params.id }).populate('reviewer')
    res.json(populatedReviews)
})

module.exports = router