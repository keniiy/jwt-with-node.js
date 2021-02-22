const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, 'email is required'],
        unique: true,
        lowercase:true,
        validate: [isEmail, 'Please Enter a valid Email']
    },
    password:{
        type: String,
        required: [true, 'Please enter Your Password'],
        minlength: [6, 'mininmun password length is 6 chracters']
    }
})

userSchema.post('save', function (doc, next) {
    console.log('new user was created and saved', doc);
    next();
})

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

const User = mongoose.model('user', userSchema);


module.exports = User;