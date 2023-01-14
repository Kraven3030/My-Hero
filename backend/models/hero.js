//==================
//   DEPENDENCIES  
//==================
const mongoose = require('mongoose')
const Schema = mongoose.Schema


//==================
//   HERO SCHEMA  
//==================

const heroSchema = new Schema(
    {
        image: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        publisher: {
            type: String,
            required: true,
        },
        count_of_issue_appearances: [{
            type: Number
        }],
        id: {
            type: Number,
            required: true,
        },
        review_id: [{
            type: mongoose.ObjectId,
            ref: 'Review'
        }]
    }
)

//=============================
//   MODEL USING ITEM SCHEMA  
//=============================

const Hero = mongoose.model('Hero', heroSchema);

//===================
//   EXPORT MODEL  
//===================

module.exports = Hero;