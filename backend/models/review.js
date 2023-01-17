const mongoose = require("mongoose");
const Schema = mongoose.Schema


const reviewSchema = new Schema({
    marvelId: {
        type: Number,
        required: false
    },
    marvelTitle: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    reviewer: {
        type: mongoose.ObjectId,
        ref: 'User',
        required: true
    }
})


//=============================
//   MODEL USING ITEM SCHEMA  
//=============================
const Review = mongoose.model('Review', reviewSchema)

//===================
//   EXPORT MODEL  
//===================
module.exports = Review