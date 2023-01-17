//==================
//   DEPENDENCIES  
//==================
const mongoose = require('mongoose')
const Schema = mongoose.Schema


//==================
//    SCHEMA  
//==================

const marvelSchema = new Schema(
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

const Marvel = mongoose.model('Marvel', marvelSchema);

//===================
//   EXPORT MODEL  
//===================

module.exports = Marvel;