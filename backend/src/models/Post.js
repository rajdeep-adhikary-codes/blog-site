'use strict'
/**
 * Module Dependencies
 */
const { getLocalTime } = require('../libs/timeLib');
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let postSchema = new Schema({
    title: {
        type: String,
        required: true,
        index: true,
    },
    author: {
        type: mongoose.Types.ObjectId,
        required: true,
        index: true
    },
    content: {
        type: String,
        default: ""
    },
    comments: {
        type: []
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'deleted'],
        default: 'active'
    },
    created_at: {
        type: String,
        default: getLocalTime()
    }
})


mongoose.model('Posts', postSchema);