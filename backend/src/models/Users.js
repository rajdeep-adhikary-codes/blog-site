'use strict'
/**
 * Module Dependencies
 */
const { getLocalTime } = require('../libs/timeLib');
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
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


mongoose.model('Users', userSchema);