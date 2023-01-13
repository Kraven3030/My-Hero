const mongoose = require("mongoose");
const Schema = mongoose.Schema


const reviewSchema = new Schema({
    heroId: {
        type: Number,
        required: true
    },
    heroTitle: {
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