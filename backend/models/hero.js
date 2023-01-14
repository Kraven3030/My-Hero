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
        thumbnail: {
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
        creators: {
            type: String,
            required: true,
        },
        comics: [{
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