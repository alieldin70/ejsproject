const mongoose = require('mongoose');
const bcrypt=require('bcryptjs');
const postSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    desc: {
        type: String,
    },
    imageurl: String,
    createdby: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const postModel = mongoose.model('Post', postSchema);
module.exports = postModel;


