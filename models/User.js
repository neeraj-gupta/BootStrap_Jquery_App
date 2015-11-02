var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String
});

mongoose.model('VoidUser', UserSchema, 'VoidUser');