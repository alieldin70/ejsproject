const mongoose = require('mongoose');
const bcrypt=require('bcryptjs');
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    imageurl: String,
    role: { type: String, default: 'User' },
    emailCondirmation: { type: Boolean, default: true }
}, { timestamps: true });
userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password,parseInt(process.env.saltrounds));
    next();
});
userSchema.pre('findOneAndUpdate',async function (next) {
    const data = await this.model.findOne(this.getQuery()).select('__v');
    this.set({__v:data.__v +1});
    next();
})
const userModel = mongoose.model('User', userSchema);
module.exports = userModel;


