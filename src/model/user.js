
//User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
        firstname: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        lastname: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true
        }},
    {timestamps: true}
);

// Hashing User password to DB
userSchema.pre('save', async function hashPassword (next) {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next()
});

userSchema.methods.isValidPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}


const userModel = mongoose.model('user', userSchema);
module.exports = userModel
